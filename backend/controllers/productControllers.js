import Product from "../models/Product.js";
import User from "../models/User.js";


export const productGet = async (req, res) => {
  try {
    const { collections, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;
    let query = {};
    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.collections = collections
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category
    }
    if (material) {
      query.material = { $in: material.split(",") }
    }
    if (brand) {
      query.brand = { $in: brand.split(",") }
    }
    if (size) {
      query.sizes = { $in: size.split(",") }
    }
    if (color) {
      query.colors = { $in: color.split(",") }
    }
    if (gender) {
      query.gender = gender
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    let sort = {};
    // sort logic
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 }
          break;
        default:
          break;
      }
    }

    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
    res.json(products)

  } catch (error) {
  
    res.status(500).json({
      message: "Product get error"
    })
  }
}

export const productGetById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
  
    res.status(500).json({
      message: "Product get error"
    })
  }
}


export const similarProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)

    if (!product) {
      res.status(404).json({ message: "Product not found" })
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product id
      gender: product.gender,
      category: product.category,

    }).limit(4);

    res.json(similarProducts)

  } catch (error) {
  
    res.status(500).json({
      message: "Product get error"
    })
  }
}


export const bestSellerProduct = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 })
    if (bestSeller) {
      res.json(bestSeller)
    } else {
      res.status(404).json({
        message: "No best seller found"
      })
    }
  } catch (error) {
  
    res.status(500).json({
      message: "Product get error"
    })
  }
}

export const newArrivalProduct = async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
    res.json(newArrivals)
  } catch (error) {
  
    res.status(500).json({
      message: "Product get error"
    })
  }
}


export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { ranking, comment } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }


    const user = req.user._id

    const totalRating = product.rating * product.numReviews + Number(ranking);
    const newNumReviews = product.numReviews + 1;
    const newRating = totalRating / newNumReviews;

    const existingUser = product.reviews.findIndex(review => review.user.toString() === user.toString())
    if (existingUser !== -1) {
      product.reviews[existingUser].rating = Number(ranking)
      product.reviews[existingUser].comment = comment
      product.reviews[existingUser].createdAt = new Date()
    } else {
      product.reviews.push({
        user: req.user._id,
        rating: Number(ranking),
        comment: comment,
        createdAt: new Date()
      }); 
    }

    product.numReviews = newNumReviews;
    product.rating = newRating;


    await product.save();
    res.status(201).json({ message: "Review added successfully" })

  } catch (error) {
  
    res.status(500).json({
      message: "Server error"
    })
  }
}