import express from "express"
import Subscriber from "../models/Subscriber.js";
const subscriberRouter = express.Router()

subscriberRouter.post('/subscriber', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    })
  }

  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({
        message: "Email is already subscribed"
      })
    }

    subscriber = new Subscriber({ email })
    await subscriber.save();
    res.status(201).json({
      message: "Successfuly subscribed to the newsletter!"
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    })
  }
})

export default subscriberRouter