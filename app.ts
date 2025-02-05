import dotenv from "dotenv"
dotenv.config()

import "./db"
import configureApp from "./config"
import routes from "./routes"
import express from "express"


const app = express()
configureApp(app)

routes(app)


export default app