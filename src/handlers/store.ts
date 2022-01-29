import express, {
  Request,
  Response,
} from 'express';
import {
  dental_product,
  product,
  Product,
} from '../models/store';
import { authorized } from '../middleware/authorized';
const shop = new Product();

const index = async (
  _req: Request,
  res: Response
) => {
  const products: dental_product[] =
    await shop.view_all();
  res.json(products);
};

const show_id = async (
  req: Request,
  res: Response
) => {
  const product: dental_product =
    await shop.show_product_id(
      parseInt(req.params.id)
    );
  res.json(product);
};

const show_categ = async (
  req: Request,
  res: Response
) => {
  try{
  const categ: dental_product[] =
    await shop.show_category(req.params.category);
  res.json(categ);
  } catch(err) {
    res.json(err).status(400)
  }
};

const create = async (
  req: Request,
  res: Response
) => {
  try {
    const product: product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const new_product = await shop.create(
      product
    );
    res.json(new_product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (
  req: Request,
  res: Response
) => {
  try{
  const cancel = await shop.delete(
    parseInt(req.params.id)
  );
  res.json(cancel);
  } catch(err) {
    res.json(err).status(400)
  }
};

const products_routes = (
  app: express.Application
) => {
  app.get('/products', index);
  app.get('/products/:id', show_id);
  app.get(
    '/products/category/:category',
    show_categ
  );
  app.post('/products', authorized, create);
  app.delete('/products/:id', destroy);
};

export default products_routes;
