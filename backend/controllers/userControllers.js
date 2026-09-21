import jwt from 'jsonwebtoken'
import User from "../models/User.js";
import { token } from '../config/token.js';



export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" })
    }
    user = new User({
      name, email, password
    })
    await user.save()

    const payload = {
      user: {
        id: user._id
      }
    }

    const generatedToken = await token(payload)

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generatedToken
    })
  } catch (error) {
    return res.status(500).json(
      { error: "Failed to Registration" }
    )
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

    const payload = {
      user: {
        id: user._id
      }
    }

    const generatedToken = await token(payload)

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generatedToken
    })

  } catch (error) {
   
    return res.status(500).json(
      { error: "Failed to Login" }
    )
  }
}

export const userProfile = async (req, res) => {
  try {
    res.json(req.user)
  } catch (error) {
   
    return res.status(500).json(
      { error: "User get error" }
    )
  }
}
