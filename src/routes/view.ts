import express, { Request, Response } from 'express'

const view: express.Router = express()


// routes to models lesson in creating with express


view.get('/home', function (req: Request, res: Response) {
    const products = {} //call the model method of view()
    return res.json(products)
    res.send('Hello World!')
})



export default view;