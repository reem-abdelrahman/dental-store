"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("./../database"));
class Order {
    async view_all(user_id) {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * from orders WHERE user_id($1)';
            const result = await connect.query(sql, [user_id]);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err} Error with showing the orders of user ${user_id}`);
        }
    }
    //needs modif
    async show_order_id(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not find the latest order by user id: ${id}.`);
        }
    }
    // show by status id NEEDS MODIF
    /*
    async show_order_status(status: string): Promise<order[]> {
     try {
     const sql:string = 'SELECT * FROM orders WHERE status=($1)';
     const conn: PoolClient = await database.connect()
     const result: QueryResult = await conn.query(sql, [status])
     conn.release()
     return result.rows
     } catch (err) {
         throw new Error(` Error: ${err}. Could not find the  order by status: ${status}.`)
     }
   } */
    async create_order(o) {
        try {
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [o.product_id, o.quantity, o.user_id, o.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error: ${err}. Could not add the order ${o}. `);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not delete the order with the id: ${id}.`);
        }
    }
}
exports.Order = Order;
