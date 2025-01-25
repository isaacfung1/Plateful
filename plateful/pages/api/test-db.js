import { query } from '../../utils/postgres';

export default async function handler(req, res) {
  try {
    // Query the database to fetch all rows from the "users" table
    const result = await query('SELECT * FROM users', []);

    // Log the results to the console for debugging
    console.log('Fetched rows:', result.rows);

    // Return the rows in the JSON response
    res.status(200).json({
      message: 'Database connected successfully',
      data: result.rows, // Send the entire table as "data"
    });
  } catch (error) {
    console.error('Database connection failed:', error);

    // Return an error response
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
}
