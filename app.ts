import dotenv from "dotenv"
import "./db"
import configureApp from "./config"
import routes from "./routes"
import express from "express"

dotenv.config()

const app = express()

configureApp(app)

routes(app)


export default app