import {
  Order,
  order,
  added_prod,
} from '../models/orders';
import express, {
  Request,
  Response,
} from 'express';
import { authorized } from '../middleware/authorized';

const profit = new Order();

// latest order by user
const show = async (
  req: Request,
  res: Response
) => {
  try{const order = await profit.show_order_id(
    parseInt(req.params.user_id)
  );
  res.json(order);
  } catch (err) {
    res.json(err).status(400)
  }
};

// create a new order
const create = async (
  req: Request,
  res: Response
) => {
  try {
    const order: order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const new_order = await profit.create_order(
      order
    );
    res.json(new_order);
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
  const cancel = await profit.delete(
    parseInt(req.params.id)
  );
  res.json(cancel);
 } catch(err) {
   res.json(err).status(400)
 }
};

const orders_routes = (
  app: express.Application
) => {
  app.get(
    '/orders/latest/:user_id',
    authorized,
    show
  );

  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
};

export default orders_routes;
