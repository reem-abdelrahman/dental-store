import express, { Router, Request, Response } from 'express'
const add: express.Router = express();
import {Product} from './../models/store'
add.post('/articles', (req: Request, res: Response) => {
    
    const article: Product = {
      title: req.body.title,
      content: req.body.content
    }
    try {
       res.send('this is the CREATE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})


export default add