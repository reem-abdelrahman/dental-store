"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = __importDefault(require("./../database"));
class Product {
    async view_all() {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * from dental_products';
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err} Error with showing the products`);
        }
    }
    async show_product_id(id) {
        try {
            const sql = 'SELECT * FROM dental_products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not find the product with the id: ${id}.`);
        }
    }
    async show_category(categ) {
        try {
            const sql = 'SELECT * FROM dental_products WHERE category=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [categ]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not find the products with the category: ${categ}.`);
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO dental_products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error: ${err}. Could not add the product ${p}. `);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM dental_products WHERE id=($1) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not delete the product with the id: ${id}.`);
        }
    }
}
exports.Product = Product;
