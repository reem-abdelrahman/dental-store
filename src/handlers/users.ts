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
        const user: user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password
        }
        const new_user: created_user = await customer.create(user)
      //  let token: string = jwt.sign(new_user)
        res.json(new_user)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    
    const user: user = req.body
    const auth_user =    await customer.authenticate(user.firstname, user.lastname, user.password)
    if (auth_user === null) {
      res.json("Please check your login in data").status(401)
    } else {
      // add token here 
      // let token = sign({user: { auth_user.id, firstname, lastname}}, process.env.TOKEN_SECRET as string)
      //res.json(auth_user + token)
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
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.post('users/login', authenticate)
  app.delete('/users', destroy)
}

export default users_routes