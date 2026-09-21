import express from "express"
import { addCart, changeProductQuantity, getUserCart, mergeCart, removeProductInCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post('/', addCart)
cartRouter.put('/', changeProductQuantity)
cartRouter.delete('/', removeProductInCart)
cartRouter.get('/', getUserCart)
cartRouter.post('/merge', protect, mergeCart )

export default cartRouter