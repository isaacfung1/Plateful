import {Pool} from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'plateful',
    database: 'PlatefulDB'
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