"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let token;
describe('test users routes', () => {
    const user = {
        firstname: 'Eman',
        lastname: 'Tantawy',
        password: '1234!!',
    };
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1 \n';
        await conn.query(sql);
        conn.release();
    });
    it('test create user endpoint', async () => {
        await request
            .post('/users')
            .send(user)
            .expect(200)
            .then((res) => {
            token = res.body;
        });
    });
    it('test index endpoint', async () => {
        await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
    it('test show 1 user endpoint', async () => {
        await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => { });
    });
    it('test delete user endpoint', async () => {
        await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => { });
    });
});
