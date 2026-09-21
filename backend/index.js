import express from 'express'
import cors from "cors"
import dotenv from "dotenv/config"
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import checkoutRouter from './routes/checkoutRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import subscriberRouter from './routes/subscriberRoutes.js'
import adminUserRouter from './routes/adminUserRoutes.js'
import adminProductRouter from './routes/adminProductRoutes.js'
import adminOrderRouter from './routes/adminOrderRoutes.js'


const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/checkout", checkoutRouter)
app.use("/api/orders", orderRouter)
app.use("/api", subscriberRouter)

// Admin
app.use("/api/admin/users", adminUserRouter)
app.use("/api/admin/products", adminProductRouter)
app.use("/api/admin/orders", adminOrderRouter)

app.get("/", (req, res) => {
  res.send("Welcome")
})

const port = process.env.PORT || 3000
// mongodb connection
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}`);
})

