import database from '../../database';
import supertest from 'supertest';
import app from '../../server';
import { user } from '../../models/users';
const request = supertest(app);
let token: string;
describe('test users routes', () => {
  const user: user = {
    firstname: 'Eman',
    lastname: 'Tantawy',
    password: '1234!!',
  };

  afterAll(async () => {
    const conn = await database.connect();
    const sql =
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1 \n';
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
      .then((res) => {});
  });

  it('test delete user endpoint', async () => {
    await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {});
  });
});
