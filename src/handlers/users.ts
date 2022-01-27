import express, { Request, Response } from 'express'
import { User, created_user, user} from '../models/users'
import jwt from 'jsonwebtoken'
import { authorized } from '../middleware/authorized'
const customer = new User()
const token_sec: string = process.env.TOKEN_SECRET as string
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
        const user: created_user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password
        }
        const new_user: user = await customer.create(user)
        let token: string = jwt.sign({user: new_user}, token_sec)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      password
    } = req.body
    const user: user = {
      firstname,
      lastname,
      password
    }
    
    const auth_user =    await customer.authenticate(user.firstname, user.lastname, user.password)
    if (auth_user === null) {
      res.json("Please check your login in data").status(401)
    } else {
      // add token here 
       let token = jwt.sign({user: { id: auth_user.id, firstname, lastname}}, token_sec)
      res.json(token)
    }
  } catch(err) {
    throw new Error("Couldn't authenticate " + err)
  }
} 
const destroy = async (req: Request, res: Response) => {
    const cancel:user = await customer.delete_user(parseInt(req.params.id))
    res.json(cancel)
}

const users_routes = (app: express.Application) => {
  app.get('/users', authorized, index)
  app.get('/users/:id', authorized, show)
  app.post('/users', authorized, create)
  app.post('users/login', authenticate)
  app.delete('/users', authorized, destroy)
}

export default users_routes