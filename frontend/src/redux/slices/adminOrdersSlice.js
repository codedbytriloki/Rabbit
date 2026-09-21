import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders", async (_DO_NOT_USE_ActionTypes, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }

})

export const orderDetail = createAsyncThunk("adminOrders/orderDetail", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateOrdersStatus = createAsyncThunk("adminOrders/updateOrdersStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/orders/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/admin/orders/${id}`, status, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    return id
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
    selectedOrder: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice
        }, 0)
        state.totalSales = totalSales
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // update order status
      .addCase(updateOrdersStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex((order) => order._id === updatedOrder._id)
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })
      // delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload)
      })
      // order  detail
      .addCase(orderDetail.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(orderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload
      })
      .addCase(orderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order details"
      })
  }
})

export default adminOrderSlice.reducer