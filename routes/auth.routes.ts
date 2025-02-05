import { Router } from 'express'
import { signUp } from '../controllers/auth.controllers'

const router = Router()

router.post('/signup', signUp)

export default router
