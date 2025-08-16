import mysq2 from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool =  mysq2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
}).promise();

export default pool;
