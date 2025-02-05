import express from "express"
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            payload?: any
        }
    }
}

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction): void => {

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return
    }

    if (!process.env.TOKEN_SECRET) {
        return
    }

    try {
        const validTokenPayload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.payload = validTokenPayload
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }

}

export default verifyToken