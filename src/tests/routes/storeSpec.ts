import supertest from 'supertest';
import {
  Product,
  product,
} from '../../models/store';
import app from '../../server';
import { user } from '../../models/users';
import database from '../../database';
const request = supertest(app);
let token: string;

describe('', () => {
  const prod: product = {
    name: 'polishing discs',
    price: 90,
    category: 'restoration',
  };

  beforeAll(async () => {
    const user: user = {
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
    const conn = await database.connect();
    const sql =
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM dental_products; \n ALTER SEQUENCE dental_products_id_seq RESTART WITH 1 \n';
    await conn.query(sql);
    conn.release();
  });
  it('test create endpoint', async () => {
    await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(prod)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'polishing discs',
          price: 90,
          category: 'restoration',
        });
      });
  });

  it('test index endpoint', async () => {
    await request
      .get('/products')
      .expect(200)
      .then((res) => {
        expect(res.body).toContain({
          id: 1,
          name: 'polishing discs',
          price: 90,
          category: 'restoration',
        });
      });
  });

  it('test show 1 endpoint', async () => {
    await request
      .get('/products/1')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'polishing discs',
          price: 90,
          category: 'restoration',
        });
      });
  });

  it('test show by category endpoint', async () => {
    const res = await request
      .get('/products/category/restoration')
      .expect(200)
      .then((res) => {
        expect(res.body).toContain({
          id: 1,
          name: 'polishing discs',
          price: 90,
          category: 'restoration',
        });
      });
  });

  it('test delete endpoint', async () => {
    await request
      .get('/products/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'polishing discs',
          price: 90,
          category: 'restoration',
        });
      });
  });
});
