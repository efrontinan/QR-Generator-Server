import User from '../models/User.model'
import express from "express"
import bcrypt from "bcryptjs"
const saltRounds = 11
import jwt from "jsonwebtoken"

interface AuthenticatedRequest extends express.Request {
    payload?: any;
}

const signUp = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { email, password, username, birth } = req.body

    if (email === '' || password === '' || username === '' || birth === '') {
        console.log('Email, username, password and birth date are mandatory.')
        res.status(409).json({ message: 'Email, username, password and birth date are mandatory.' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        console.log('Provide a valid email address.')
        res.status(409).json({ message: 'Provide a valid email address.' })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                console.log('User already exists')
                res.status(401).json({ message: 'User already exists.' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({
                email,
                password: hashedPassword,
                username,
                birth
            })
        })
        .then(newUser => res.status(201).json(newUser))
        .catch(err => next(err))
}

const loginUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        console.log('Provide email and password')
        res.status(401).json({ message: 'Provide email and password' })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(401).json({ message: 'This user does not exist' })
                return
            }

            const isCorrectPwd = bcrypt.compareSync(password, user.password)

            if (!isCorrectPwd) {
                res.status(401).json({ message: 'Incorrect password' })
                return
            }

            const { _id, email, username } = user
            const payload = { _id, email, username }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET as string,
                { algorithm: 'HS256', expiresIn: '6h' }
            )

            res.json({ authToken })
        })
        .catch(err => next(err))

}

const verifyUser = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {

    if (!req.payload) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    res.json({ loggedUserData: req.payload })
}

export { signUp, loginUser, verifyUser } 