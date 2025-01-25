import {Pool} from './pool.js';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'plateful',
    database: 'plateful'
});

export default pool;