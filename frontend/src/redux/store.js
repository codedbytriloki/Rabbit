import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import checkoutReducer from "./slices/checkoutSlice"
import adminReducer from "./slices/adminSlice"
import adminProductReducer from "./slices/adminProductSlice"
import adminOrderReducer from "./slices/adminOrdersSlice"



const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer
  },
})

export default store;