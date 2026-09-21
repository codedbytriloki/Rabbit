import User from "../models/User.js"

export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users)
  } catch (error) {
   
    res.status(500).json({
      message: "Server error"
    })
  }
}

export const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }
    if(password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 characters long" })
    }
    user = new User({
      name, email, password, role: role || "customer"
    })
    await user.save()

    res.status(201).json({
      message: "User created successfully", user
    })
  } catch (error) {
   
    return res.status(500).json(
      { message: "Server error" }
    )
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      user.name = req.body.name || user.name,
        user.email = req.body.email || user.email,
        user.role = req.body.role || user.role
    }
    const updatedUser = await user.save();
    res.json({
      message: "User updated successfully", user: updatedUser
    })
  } catch (error) {
   
    return res.status(500).json(
      { message: "Server error" }
    )
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({
        message: "User deleted successfully"
      })
    } else {
      res.status(404).json(
        { message: "User not found" }
      )
    }
  } catch (error) {
   
    res.status(500).json(
      { message: "Server error" }
    )
  }
}