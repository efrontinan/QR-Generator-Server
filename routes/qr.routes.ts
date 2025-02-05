import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'
import { createQR, deleteQr, getQR, getQRList } from '../controllers/qr.controllers'

const router = Router()

router.post('/codes', verifyToken, createQR)
router.get('/codes/:userId', verifyToken, getQRList)
router.get('/code/:id', verifyToken, getQR)
router.delete('/code/:id', verifyToken, deleteQr)

export default router