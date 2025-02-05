import QR from '../models/Qr.model'
import express from 'express'

interface AuthenticatedRequest extends express.Request {
    payload?: any;
}

const createQR = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {

    const { svg, name } = req.body
    const { _id: author } = req.payload

    if (svg === '' || name === '') {
        console.log('Fill the data')
        res.status(409).json({ message: 'Fill the data' })
        return
    }

    QR
        .create({ author, svg, name })
        .then(newSvg => {
            res.status(201).json(newSvg)
        })
        .catch(err => next(err))
}

const getQRList = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {

    const { userId } = req.params

    if (!userId) {
        res.status(400).json({ message: "Author ID is required" })
        return
    }

    QR
        .find({ author: userId })
        .then(codes => {
            res.json(codes)
        })
        .catch(err => next(err))
}

const getQR = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {

    const { id } = req.params

    if (!id) {
        res.status(400).json({ message: "QR Id is required" })
        return
    }

    QR
        .findById(id)
        .then(code => {
            res.json(code)
        })
        .catch(err => next(err))
}

const deleteQr = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {

    const { id } = req.params

    if (!id) {
        res.status(400).json({ message: "QR Id is required" })
        return
    }

    QR
        .findByIdAndDelete(id)
        .then(() => {
            res.status(204)
        })
        .catch(err => next(err))
}

export { createQR, getQRList, getQR, deleteQr }