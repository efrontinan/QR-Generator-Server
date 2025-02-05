import { Express } from 'express'
import authRouter from './auth.routes'

export default (app: Express): void => {
    app.use('/api', authRouter)
}