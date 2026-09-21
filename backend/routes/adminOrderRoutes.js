import express from "express"
const adminOrderRouter = express.Router()
import { admin, protect } from "../middleware/authMiddleware.js"
import { getOrders, updateOrders , deleteOrder, getOrderDetail} from "../controllers/adminOrderController.js"

adminOrderRouter.get('/', protect, admin, getOrders  )
adminOrderRouter.get('/:id', protect, admin, getOrderDetail  )
adminOrderRouter.put('/:id', protect, admin, updateOrders  )
adminOrderRouter.delete('/:id', protect, admin, deleteOrder )

export default adminOrderRouter