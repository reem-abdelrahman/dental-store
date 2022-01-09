import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import view from './view'
import add from './post'
const routes: express.Router = express()


routes.use('/', view )
routes.use('/', add )

routes.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


export default routes;