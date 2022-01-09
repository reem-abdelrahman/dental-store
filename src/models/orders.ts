import { PoolClient, QueryResult } from 'pg';
import database from './../database'

export interface order {
    id: number;
    product_id: string;
    quantity: number;
    user_id: string;
    status: string;
    
  }
export interface created_order {
    product_id: number;
    quantity: number;
    user_id: number;
    status: string;
}  

export class Order {
    async view_all(user_id: number): Promise<order[]> {
        try{
        const connect: PoolClient = await database.connect();
        const sql: string = 'SELECT * from orders WHERE user_id($1)';
        const result: QueryResult = await connect.query(sql, [user_id])
        connect.release() 
        return result.rows
        } catch (err) {
            throw new Error(`Error: ${err} Error with showing the orders of user ${user_id}`)
        }
    }

    //needs modif

    async show_order_id(id: number): Promise<order> {
      try {
      const sql:string = 'SELECT * FROM orders WHERE id=($1)';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
      } catch (err) {
          throw new Error(` Error: ${err}. Could not find the latest order by user id: ${id}.`)
      }
    }

   

    async create_order(o: created_order): Promise<order> {
        try {
      const sql: string = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn
          .query(sql, [o.product_id, o.quantity, o.user_id, o.status])
      conn.release()
      return result.rows[0]
        } catch (err) {
            throw new Error(`Error: ${err}. Could not add the order ${o}. `)
        }
    }

    async delete(id: number): Promise<order> {
        try {
      const sql: string = 'DELETE FROM orders WHERE id=($1)';
      const conn: PoolClient = await database.connect()
      const result: QueryResult = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
        } catch (err) {
            throw new Error(` Error: ${err}. Could not delete the order with the id: ${id}.`)
        }
    }
}