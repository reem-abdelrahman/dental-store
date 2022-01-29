import { PoolClient, QueryResult } from 'pg';
import database from './../database';

export type order = {
  id?: number;
  user_id: number | string;
  status: string;
};

export interface added_prod {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
}
export class Order {
  async show_order_id(
    id: number
  ): Promise<order> {
    try {
      const sql: string =
        'SELECT * FROM orders WHERE id=($1)';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `${err}. Could not find the latest order by user id: ${id}.`
      );
    }
  }

  async show_order_status(
    status: string
  ): Promise<order[]> {
    try {
      const sql: string =
        'SELECT * FROM orders WHERE status=($1)';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `${err}. Could not find the  order by status: ${status}.`
      );
    }
  }

  async create_order(o: order): Promise<order> {
    try {
      const sql: string =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [
          o.user_id,
          o.status,
        ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `${err}. Could not add the order ${o}. `
      );
    }
  }

  async addProd(
    p: added_prod
  ): Promise<added_prod> {
    try {
      const sql: string =
        'INSERT INTO product_order (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [
          p.quantity,
          p.order_id,
          p.product_id,
        ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `${err}. Could not add the product ${p} to the order ${p.order_id}. `
      );
    }
  }
  async delete(id: number): Promise<order> {
    try {
      const sql: string =
        'DELETE FROM orders WHERE id=($1) RETURNING *';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `${err}. Could not delete the order with the id: ${id}.`
      );
    }
  }
}
