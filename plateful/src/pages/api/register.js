import { query } from "../../utils/postgres";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, email, password } = req.body;
  
      try {
        const result = await query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
          [username, email, password]
        );
        res.status(200).json({ user: result.rows[0] });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }