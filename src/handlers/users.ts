import express, { Request, Response } from 'express'
import { User, created_user, user} from '../models/users'

const customer = new User()

const index = async (_req: Request, res: Response) => {
  const users: user[] = await customer.view_users()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const user: user = await customer.show_user(parseInt(req.params.id))
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {

        const new_user: created_user = await customer.create(req.body)
        res.json(new_user)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const cancel:user = await customer.delete_user(parseInt(req.params.id))
    res.json(cancel)
}

const users_routes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default users_routes