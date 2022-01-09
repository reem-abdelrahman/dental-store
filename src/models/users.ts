import { PoolClient, QueryResult } from 'pg';
import database from './../database'


export interface user {
    id: number;
    firstname: string;
    lastname: string;
    password: string | number;
  }
export interface  createdUser  {
    firstname: string;
    lastname: string;
    password: string | number;
}


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

    /*
    async create(u: createdUser): Promise<dental_product> {
        try {
      const sql: string = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn
          .query(sql, [u.firstname, u.lastname, u.password])
      conn.release()
      return result.rows[0]
        } catch (err) {
            throw new Error(`Error: ${err}. Could not add the product ${product}. `)
        }
    } */

    async delete_user(id: number): Promise<user> {
        try {
      const sql: string = 'DELETE FROM users WHERE id=($1)';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
        } catch (err) {
            throw new Error(` Error: ${err}. Could not delete the user with the id: ${id}.`)
        }
    }
}  