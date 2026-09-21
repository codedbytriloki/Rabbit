import express from "express"
const adminProductRouter = express.Router()
import { admin, protect } from "../middleware/authMiddleware.js"
import { getProduct, addProduct, productDeleteById, productUpdateById } from "../controllers/adminProductController.js"
import { upload } from "../middleware/multer.js"

adminProductRouter.get('/', protect, admin, getProduct)
 adminProductRouter.post("/", protect, admin, upload.array("images", 5), addProduct)
 adminProductRouter.put("/:id", protect, admin, upload.array("images", 5), productUpdateById)
 adminProductRouter.delete("/:id", protect, admin, productDeleteById)

export default adminProductRouter