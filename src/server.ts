import express, { Request, Response } from 'express'
//const express = require('express')
import cors from 'cors'
import bodyParser from 'body-parser'
import products_routes from './handlers/store'
import orders_routes from './handlers/orders'
import users_routes from './handlers/users'


const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const corsConfig = {
    // origins: '',
    optionsSuccessStatus: 200
}
app.use(cors(corsConfig))
app.use(bodyParser.json())
products_routes(app)
orders_routes(app)
users_routes(app)

app.get('/',  (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log(`starting app on: ${address}`)
})

export default app