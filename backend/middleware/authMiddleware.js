import jwt from 'jsonwebtoken'
import User from '../models/User.js';


// Middle ware to protect routes
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(400).json({ message: "Invalid Credentials" })
      }
      req.user = await User.findById(decoded.user.id).select("-password")
      next();
    } catch (error) {
     
     return res.status(401).json({
        message: "Not authoried token failed"
      })
    }
  } else {
    res.status(401).json({
      message: "Not authorized, no token provided"
    })
  }
}

export const admin = async(req, res,next) => {
  if(req.user && req.user.role === "admin" && req.user.role !== "Admin"){
    next()
  }else{
    res.status(403).json({
      message: "Not authorized, as an admin"
    })
  }
}