import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

const config = {
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string),
  database:
    ENV === 'dev'
      ? POSTGRES_DB
      : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

const database: Pool = new Pool(config);
console.log(
  'the env is ' +
    ENV +
    '' +
    JSON.stringify(config)
);
export default database;
