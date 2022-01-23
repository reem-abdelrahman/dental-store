import { Order, created_order, order } from '../models/orders'
import express, { Request, Response } from 'express'


// still need to add token

const profit = new Order
// all orders by user
const index = async (req: Request, res: Response) => {
    const orders = await profit.view_all(parseInt(req.params.user_id))
    res.json(orders)
  }
  // latest order by user
  const show = async (req: Request, res: Response) => {
     const order = await profit.show_order_id(parseInt(req.params.user_id))
     res.json(order)
  }
  // still need to add show by status
  const show_status = async (req: Request, res: Response) => {
    const order = await profit.show_order_status(req.params.user_id)
    res.json(order)
  }  
  // create a new order
  const create = async (req: Request, res: Response) => {
      try {
  
          const new_order = await profit.create_order(req.body)
          res.json(new_order)
      } catch(err) {
          res.status(400)
          res.json(err)
      }
  }
  
  const destroy = async (req: Request, res: Response) => {
      const cancel = await profit.delete(parseInt(req.params.order_id))
      res.json(cancel)
  }
  
  const orders_routes = (app: express.Application) => {
    app.get('/orders/:user_id', index)
    app.get('/orders/latest/:user_id', show)
    app.get('orders/:status', show_status)
    app.post('/orders', create)
    app.delete('/orders/:order_id', destroy)
  }
  
  export default orders_routes