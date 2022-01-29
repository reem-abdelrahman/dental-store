"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("./../database"));
class Order {
    async show_order_id(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}. Could not find the latest order by user id: ${id}.`);
        }
    }
    async show_order_status(status) {
        try {
            const sql = 'SELECT * FROM orders WHERE status=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}. Could not find the  order by status: ${status}.`);
        }
    }
    async create_order(o) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                o.user_id,
                o.status,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}. Could not add the order ${o}. `);
        }
    }
    async addProd(p) {
        try {
            const sql = 'INSERT INTO product_order (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                p.quantity,
                p.order_id,
                p.product_id,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}. Could not add the product ${p} to the order ${p.order_id}. `);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}. Could not delete the order with the id: ${id}.`);
        }
    }
}
exports.Order = Order;
