import express, { Request, Response } from 'express'
import { dental_product, product, Product } from '../models/store'
const shop = new Product()

const index = async (_req: Request, res: Response) => {
  const products: dental_product[] = await shop.view_all()
  res.json(products)
}

const show_id = async (req: Request, res: Response) => {
   const product: dental_product = await shop.show_product_id(parseInt(req.params.id))
   res.json(product)
}

const show_categ = async (req: Request, res: Response) => {
  const categ: dental_product[] = await shop.show_product_category(req.params.categ)
  res.json(categ)
}

const create = async (req: Request, res: Response) => {
    try {

        const new_product: product = await shop.create(req.body)
        res.json(new_product)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const cancel = await shop.delete(req.body.id)
    res.json(cancel)
}

const products_routes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show_id)
  app.get('/products/:categ', show_categ)
  app.post('/products', create)
  app.delete('/products', destroy)
}

export default products_routes