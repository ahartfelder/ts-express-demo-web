import dotenvFlow from 'dotenv-flow';
import { Pool, QueryResult, QueryResultRow } from 'pg';

dotenvFlow.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

pool
  .query(
    `CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL CHECK (LENGTH(password_hash) >= 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)`
  )
  .then((info) => {
    console.log('TABLE ALREADY EXISTS OR HAS BEEN CREATED SUCCESSFULLY');
  })
  .catch((err) => console.log('TABLE CREATION ERROR', err));

export const query = async <T extends QueryResultRow>(
  text: string,
  values?: any[]
): Promise<QueryResult<T>> => {
  try {
    return pool.query(text, values);
  } catch (error) {
    console.log('PG-REQUEST-ERROR:', error);
    throw error;
  }
};
