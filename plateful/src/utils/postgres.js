import {Pool} from 'pg';
require('dotenv').config()
const dbPassword = process.env.DB_PASSWORD;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: dbPassword,
    database: 'plateful-tj'
});

export const query = async (text, params) => {
    const client = await pool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  };