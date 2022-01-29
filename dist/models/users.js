"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = __importDefault(require("./../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class User {
    async view_users() {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * from users';
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err} Error with showing all users`);
        }
    }
    async show_user(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not find the user with the id: ${id}.`);
        }
    }
    // may haev an error 
    async create(u) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const hashed_pass = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
            const result = await conn
                .query(sql, [u.firstname, u.lastname, hashed_pass]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error: ${err}. Could not create the user ${u}. `);
        }
    }
    async authenticate(firstname, lastname, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password from users WHERE firstname=($1) AND lastname=($2)';
            const result = await conn.query(sql, [firstname, lastname]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error('Unable to authenticate');
        }
    }
    async delete_user(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` Error: ${err}. Could not delete the user with the id: ${id}.`);
        }
    }
}
exports.User = User;
