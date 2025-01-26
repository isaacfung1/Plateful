import {Pool} from 'pg';

const pool = new Pool({
    host: '10.216.81.16',
    port: 5432,
    user: 'postgres',
    password: 'plateful',
    database: 'plateful'
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