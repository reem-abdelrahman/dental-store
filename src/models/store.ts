import { PoolClient, QueryResult } from 'pg';
import database from './../database';
// ts here the db name
export interface dental_product {
  id: number;
  name: string;
  price: number;
  category?: string;
}
export interface product {
  name: string;
  price: number;
  category?: string;
}

export class Product {
  async view_all(): Promise<dental_product[]> {
    try {
      const connect: PoolClient =
        await database.connect();
      const sql: string =
        'SELECT * from dental_products';
      const result: QueryResult =
        await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Error: ${err} Error with showing the products`
      );
    }
  }

  async show_product_id(
    id: number
  ): Promise<dental_product> {
    try {
      const sql: string =
        'SELECT * FROM dental_products WHERE id=($1)';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        ` Error: ${err}. Could not find the product with the id: ${id}.`
      );
    }
  }

  async show_category(
    categ: string
  ): Promise<dental_product[]> {
    try {
      const sql: string =
        'SELECT * FROM dental_products WHERE category=($1)';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [categ]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        ` Error: ${err}. Could not find the products with the category: ${categ}.`
      );
    }
  }

  async create(
    p: product
  ): Promise<dental_product> {
    try {
      const sql: string =
        'INSERT INTO dental_products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [
          p.name,
          p.price,
          p.category,
        ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error: ${err}. Could not add the product ${p}. `
      );
    }
  }

  async delete(
    id: number
  ): Promise<dental_product> {
    try {
      const sql: string =
        'DELETE FROM dental_products WHERE id=($1) RETURNING *';
      const conn: PoolClient =
        await database.connect();
      const result: QueryResult =
        await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        ` Error: ${err}. Could not delete the product with the id: ${id}.`
      );
    }
  }
}
