import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173"

const configureApp = (app: express.Application): void => {
    app.set("trust proxy", 1)
    app.use(
        cors({
            origin: [FRONTEND_URL]
        })
    )

    app.use(logger("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
}

export default configureApp