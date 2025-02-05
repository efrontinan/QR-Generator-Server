import { Router } from 'express'
import { loginUser, signUp, verifyUser } from '../controllers/auth.controllers'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.post('/signup', signUp)
router.post('/login', loginUser)
router.get('/verify', verifyToken, verifyUser)

export default router
