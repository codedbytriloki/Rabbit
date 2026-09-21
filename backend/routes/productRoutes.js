import express from "express"
const productRouter = express.Router()
import { protect } from "../middleware/authMiddleware.js"
import { addReview, bestSellerProduct, newArrivalProduct, productGet, productGetById, similarProduct } from "../controllers/productControllers.js"

productRouter.get("/best-seller",  bestSellerProduct)
productRouter.get("/new-arrivals",  newArrivalProduct)
productRouter.get("/:id",  productGetById)
productRouter.get("/similar/:id",  similarProduct)
productRouter.get("/",  productGet)
productRouter.put("/review/:id", protect, addReview)


export default productRouter