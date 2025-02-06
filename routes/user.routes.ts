import { Router } from 'express'
import { deleteUser, editUserInfo, getUserInfo } from '../controllers/user.controllers'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.get('/user/:userId', verifyToken, getUserInfo)
router.put('/user/:userId', verifyToken, editUserInfo)
router.delete('/user/:userId', verifyToken, deleteUser)

export default router