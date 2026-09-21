import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { createCheckOut, payCheckOut, finalizeCheckout, verifyPayment } from "../controllers/checkoutController.js"

const checkoutRouter = express.Router()

checkoutRouter.post('/', protect, createCheckOut)
checkoutRouter.put('/:id/pay', protect, payCheckOut)
checkoutRouter.put('/:id/verify', protect, verifyPayment)
checkoutRouter.post('/:id/finalize', protect, finalizeCheckout)

export default checkoutRouter
