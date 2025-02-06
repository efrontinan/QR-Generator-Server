import { Express } from 'express'
import authRouter from './auth.routes'
import qrRouter from './qr.routes'
import userRouter from './user.routes'

export default (app: Express): void => {
    app.use('/api', authRouter)
    app.use('/api', qrRouter)
    app.use('/api', userRouter)
}