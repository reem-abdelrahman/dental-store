"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
let token;
describe('', () => {
    const order = {
        user_id: 1,
        status: 'active',
    };
    beforeAll(async () => {
        const user = {
            firstname: 'Eman',
            lastname: 'Tantawy',
            password: '1234!!',
        };
        await request
            .post('/users')
            .send(user)
            .expect(200)
            .then((response) => {
            token = response.body;
        });
    });
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = 'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM dental_products; \n ALTER SEQUENCE dental_products_id_seq RESTART WITH 1 \n';
        await conn.query(sql);
        conn.release();
    });
    it('test create order endpoint', async () => {
        await request
            .post('/orders')
            .send(order)
            .expect(200);
    });
    it('test view current order', async () => {
        await request
            .get('/orders/latest/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
    it('test delete endpoint', async () => {
        await request
            .delete('/orders/1')
            .expect(200)
            .then((res) => {
            expect(res.body).toEqual({
                id: 1,
                user_id: 1,
                status: 'active',
            });
        });
    });
});
