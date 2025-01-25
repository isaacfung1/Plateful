import { query } from '../../utils/postgres';

export default async function handler(req, res) {
  try {
    const result = await query('SELECT NOW()', []);
    res.status(200).json({ message: 'Database connected successfully', timestamp: result.rows[0].now });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
}
