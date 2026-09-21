import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// get user id or guest id
const getCart = async (userId, guestId) => {

  if (userId) {
    const userCart = await Cart.findOne({ user: userId })
    if (userCart) return userCart
  }

  if (guestId) {
    return await Cart.findOne({ guestId })
  }

  return null
}

export const addCart = async (req, res) => {

  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if(!size || !color){
      return res.status(400).json({ message: "Size and color are required" })
    }

    if(product.countInStock <= 0 || product.countInStock < quantity || product.countInStock === 0){
      return res.status(400).json({ message: "Product is out of stock" })
    }

    // determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);
    // cart exists
    if (cart) {
      // find same product 
      const productIndex = cart.products.findIndex((p) =>
        p.productId.toString() === productId && p.size === size && p.color === color)


      if (productIndex > -1) {
        // if the product already exists , update the quantity
        cart.products[productIndex].quantity += quantity
      } else {
        // add new cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity
        })
      }
      // total price 
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
      await cart.save();
      return res.status(201).json(cart)
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: userId ? undefined : (guestId || "guest_" + new Date().getTime()),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          }
        ],
        totalPrice: product.price * quantity
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
}

export const changeProductQuantity = async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;
  
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({
      message: "Cart not found"
    })

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);

    if (productIndex > -1) {
      // update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity
      } else {
        cart.products.splice(productIndex, 1)
      }
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({
        message: "Product not found in cart"
      })
    }
  } catch (error) {
   
    res.status(500).json({
      message: "Server error"
    })
  }
}


export const removeProductInCart = async (req, res) => {
  try {
    const { productId, size, color, guestId, userId } = req.body;
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      })
    }
    const productIndex = cart.products.findIndex((p) =>
      p.productId.toString() === productId && p.size === size && p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1)
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({
        message: "Product not found in cart"
      })
    }
  } catch (error) {
   
    res.status(500).json({
      message: "Server error"
    })
  }
}

export const getUserCart = async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);

    if (cart) {
      res.json(cart)
    } else {
      return res.status(404).json({
        message: "Cart not found"
      })
    }

  } catch (error) {
   
    res.status(500).json({
      message: "Server error"
    })
  }
}

export const mergeCart = async (req, res) => {
  const { guestId } = req.body;

  try {
    // find guest and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id })

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({
          message: "Guest cart is empty"
        })
      }
      if (userCart) {
        // merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) => item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color
          );
          if (productIndex > -1) {
            // if the items exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem)
          }
        });
        userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId })
        } catch (error) {
          console.log("Error deleting guest cart", error);
        }
        res.status(200).json(userCart)
      } else {
        // if the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.status(200).json(guestCart)
      }
    } else {
      if (userCart) {
        // guest cart has already been merged, return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({
        message: "Guest cart not found"
      })
    }
  } catch (error) {
   
    res.status(500).json({
      message: "Server error"
    })
  }
}