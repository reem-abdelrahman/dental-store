import express, { Request, Response } from 'express'
import routes from './routes/index'
import cors from 'cors'
import bodyParser from 'body-parser'
import products_routes from './handlers/store'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsConfig = {
    // origins: '',
    optionsSuccessStatus: 200
}
app.use(cors(corsConfig))
app.use(bodyParser.json())
products_routes(app)
app.use('/products', routes)
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
