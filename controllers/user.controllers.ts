import User from '../models/User.model'
import express from 'express'
import bcrypt from "bcryptjs"
const saltRounds = 11
import jwt from "jsonwebtoken"

interface AuthenticatedRequest extends express.Request {
    payload?: any;
}

const getUserInfo = (req: express.Request
    , res: express.Response, next: express.NextFunction) => {

    const { userId } = req.params

    if (!userId) {
        res.status(400).json({ message: "User Id is required" })
        return
    }

    User
        .findById(userId)
        .then(user => {
            res.json(user)
        })
        .catch(err => next(err))

}

const editUserInfo = (req: express.Request
    , res: express.Response, next: express.NextFunction) => {

    const { password, username, email } = req.body
    const { userId } = req.params
    const { _id } = req.payload

    if (userId !== _id) {
        res.status(401).json({ message: 'This user is not valid' })
        return
    }

    User
        .findById(userId)
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

            return User.findByIdAndUpdate(
                userId,
                { username, email },
                { runValidators: true, new: true }
            )
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => next(err))
}

const deleteUser = (req: AuthenticatedRequest
    , res: express.Response, next: express.NextFunction) => {
    const { password } = req.body
    const { userId } = req.params
    const { _id } = req.payload

    if (userId !== _id) {
        res.status(401).json({ message: 'This user is not valid' })
        return
    }

    User
        .findById(userId)
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

            return User.findByIdAndDelete(userId)
        })
        .then(() => {
            res.status(204).json({ message: 'User deleted successfully' });
        })
        .catch(err => next(err))
}

export { getUserInfo, editUserInfo, deleteUser }