import dotenv from  'dotenv'
import {Pool} from 'pg'
dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_TEST_DB,
    ENV
} = process.env


console.log("the env is"+ ENV);

 const database: Pool = new Pool ({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === "test"? POSTGRES_TEST_DB : POSTGRES_DB
  });
export default database