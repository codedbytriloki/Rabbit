import Order from "../models/Order.js"

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email")
    res.json(orders)
  } catch (error) {
    res.status(500).json(
      { message: "Server Error" }
    )
  }
}

export const getOrderDetail = async(req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if(!order){
     return res.status(404).json(
        { message: "Order not found" }
      )
    }
    res.json(order)
  } catch (error) {
  
    res.status(500).json(
      { message: "Server Error" }
    )
  }
} 

export const updateOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name")
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404).json(
        { message: "Order not found" }
      )
    }
  } catch (error) {
  
    res.status(500).json(
      { message: "Server Error" }
    )
  }
}


export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      await order.deleteOne();
      res.json({
        message: "Order removed"
      })
    } else {
      res.status(404).json(
        { message: "Order not found" }
      )
    }
  } catch (error) {
    res.status(500).json(
      { message: "Server Error" }
    )
  }
}