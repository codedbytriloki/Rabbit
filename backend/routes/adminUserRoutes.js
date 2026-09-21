import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js';
import { getUser, addUser, updateUser, deleteUser } from '../controllers/adminUserController.js';

const adminUserRouter = express.Router();

adminUserRouter.get('/', protect, admin, getUser)
adminUserRouter.post('/', protect, admin, addUser)
adminUserRouter.put('/:id', protect, admin, updateUser)
adminUserRouter.delete('/:id', protect, admin, deleteUser)

export default adminUserRouter 