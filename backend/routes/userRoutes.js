import express from "express"
const userRouter = express.Router()
import { login, register, userProfile } from "../controllers/userControllers.js"
import { protect } from "../middleware/authMiddleware.js"

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/profile', protect, userProfile)

export default userRouter