import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getOrderById, myOrder } from "../controllers/orderController.js"
const orderRouter = express.Router()

orderRouter.get('/my-orders', protect, myOrder)
orderRouter.get('/:id', protect, getOrderById )

export default orderRouter
