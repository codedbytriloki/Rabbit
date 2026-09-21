import Razorpay from "razorpay";
import crypto from "crypto";
import Cart from "../models/Cart.js";
import Checkout from "../models/Checkout.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})


export const createCheckOut = async (req, res) => {
  try {
    const { checkItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkItems || checkItems.length === 0) {
      return res.status(400).json({
        message: "No item in checkout"
      })
    }
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkItems: checkItems,
      shippingAddress, paymentMethod, totalPrice,
      paymentStatus: "Pending",
      isPaid: false
    })
    res.status(201).json(newCheckout)
  } catch (error) {
  
    res.status(500).json({
      message: "Server error"
    })
  }
}

export const payCheckOut = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id)

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" })
    }

    const totalPrice = checkout.totalPrice

    const exchangeRate = 80
    const inrAmount = totalPrice * exchangeRate;
    const razorOrder = await instance.orders.create({
      amount: Math.round(inrAmount * 100),
      currency: 'INR',
      receipt: `seceipt_${Date.now()}`
    })

    if (razorOrder.id) {
      checkout.razorpayOrderId = razorOrder.id;
      checkout.isPaid = false;
      await checkout.save();

      res.status(200).json({
        orderId: checkout._id,
        razorOrder,
        checkout
      })
    } else {
      return res.status(400).json({ message: "Payment Failed" })
    }
  } catch (error) {
  
    res.status(500).json({
      message: "Server error"
    })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { paymentDetails } = req.body;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentDetails || {};

    const checkout = await Checkout.findById(req.params.id)

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" })
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (
      razorpay_order_id === checkout.razorpayOrderId &&
      razorpay_signature === expectedSignature
    ) {
      checkout.isPaid = true;
      checkout.paymentStatus = "paid";
      checkout.razorpayPaymentId = razorpay_payment_id;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout)
    } else {
      return res.status(400).json({ message: "Invalid payment signature" })
    }
  } catch (error) {
  
    res.status(500).json({
      message: "Server error"
    })
  }
}



export const finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id)

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" })
    }



    if (checkout.isPaid && !checkout.isFinalized) {
      // create finalorder
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails
      })

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();

      checkout.checkItems.forEach(async (item) => {
        const product = item.productId;
        const findProduct = await Product.findById(product);
        if (findProduct) {
          findProduct.countInStock -= item.quantity;
          await findProduct.save();
        }
      });

      await checkout.save();


      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user })
      res.status(200).json(finalOrder)
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" })
    } else {
      return res.status(400).json({ message: "Checkout is not paid" })
    }
  } catch (error) {
  
    res.status(500).json({
      message: "Server error"
    })
  }
}
