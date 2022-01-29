import { PoolClient, QueryResult } from 'pg';
import database from './../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export interface user {
    id?: number;
    firstname: string;
    lastname: string;
    password: string | number;
  }
export interface  created_user  {
    firstname: string;
    lastname: string;
    password: string | number;
}

const salt: string = process.env.SALT_ROUNDS as string
const pepper: string = process.env.BCRYPT_PASSWORD as string
  export class User {

    async view_users(): Promise<user[]> {
        try{
        const connect: PoolClient = await database.connect();
        const sql: string = 'SELECT * from users';
        const result: QueryResult = await connect.query(sql)
        connect.release() 
        return result.rows
        } catch (err) {
            throw new Error(`Error: ${err} Error with showing all users`)
        }
    }

    

    async show_user(id: number): Promise<user> {
      try {
      const sql:string = 'SELECT * FROM users WHERE id=($1)';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
      } catch (err) {
          throw new Error(` Error: ${err}. Could not find the user with the id: ${id}.`)
      }
    }
// may haev an error 
    
    async create(u: created_user): Promise<user> {
        try {
      const sql: string = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      const conn: PoolClient = await database.connect()
      const hashed_pass: string = bcrypt.hashSync(u.password + pepper, parseInt(salt));
      const result: QueryResult = await conn
          .query(sql, [u.firstname, u.lastname, hashed_pass])
      conn.release()
      
      return result.rows[0]
        } catch (err) {
            throw new Error(`Error: ${err}. Could not create the user ${u}. `)
        }
    }

    async authenticate(firstname: string, lastname: string, password: string | number): Promise<user| null> {
      try{const conn: PoolClient = await database.connect()
      const sql: string = 'SELECT password from users WHERE firstname=($1) AND lastname=($2)'
      const result: QueryResult = await conn.query(sql, [firstname, lastname])
      if(result.rows.length) {
        const user = result.rows[0]
        if(bcrypt.compareSync(password+pepper, user.password)) {
          return user
        }
      } 

     
      return null
    }
    catch(err) {
      throw new Error('Unable to authenticate')
    }
      
      
    }
 
    async delete_user(id: number): Promise<user> {
        try {
      const sql: string = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
        } catch (err) {
            throw new Error(` Error: ${err}. Could not delete the user with the id: ${id}.`)
        }
    }
}  