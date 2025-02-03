import express from "express"
const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
    console.log('ha accedido al inicio')
    res.send('Inicio')
})

import configureApp from "./config"
configureApp(app)

export default app