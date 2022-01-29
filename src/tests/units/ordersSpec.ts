// still need to add unit testing

import {
  order,
  Order,
  added_prod,
} from '../../models/orders';
import {
  dental_product,
  Product,
} from '../../models/store';
import { user, User } from '../../models/users';
import database from '../../database';

const shop = new Order();

describe('Order model', () => {
  it('should have a show by id method', () => {
    expect(shop.show_order_id).toBeDefined();
  });

  it('should have a create method', () => {
    expect(shop.create_order).toBeDefined();
  });
  it('should have an add productmethod', () => {
    expect(shop.addProd).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(shop.delete).toBeDefined();
  });
});

describe('test CRUD methods', () => {
  const create_product = new Product();
  const user = new User();
  let P: dental_product;
  let result: order;
  const dummy_order: order = {
    user_id: '',
    status: 'active',
  };
  let dummy_product: dental_product;
  beforeAll(async () => {
    P = await create_product.create({
      name: 'polishing discs',
      price: 90,
      category: 'restoration',
    });
    if (P.id) dummy_product = P;
    const new_user: user = await user.create({
      firstname: 'FKA',
      lastname: 'Twigs',
      password: 'metaangel2022',
    });
    if (new_user.id)
      dummy_order.user_id =
        new_user.id.toString();
  });

  it('should create a new order', async () => {
    result = await shop.create_order(dummy_order);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active',
    });
  });

  it('should add a product to the order', async () => {
    const added_product: added_prod =
      await shop.addProd({
        quantity: 15,
        order_id: result.id as number,
        product_id: P.id,
      });
    expect(added_product).toEqual({
      quantity: 15,
      order_id: 1,
      product_id: 1,
      id: 1,
    });
  });

  it('view one order by id', async () => {
    const result: order =
      await shop.show_order_id(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active',
    });
  });
  it('view orders by status', async () => {
    const result: order[] =
      await shop.show_order_status('active');
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'active',
      },
    ]);
  });

  it('should delete order by id', async () => {
    const sql =
      'DELETE FROM product_order; \n ALTER SEQUENCE product_order_id_seq RESTART WITH 1';
    const conn = await database.connect();
    await conn.query(sql);
    conn.release();
    const result: order = await shop.delete(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active',
    });
  });
  afterAll(async () => {
    const sql =
      'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM dental_products; \n ALTER SEQUENCE dental_products_id_seq RESTART WITH 1 \n';
    const conn = await database.connect();
    await conn.query(sql);
    conn.release();
  });
});
