import Product from "../models/Product.js"
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json(
      { message: "Server Error" }
    )
  }
}


export const addProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image"
      });
    }

    // upload all images to Cloudinary
    const imageUrl = await Promise.all(
      req.files.map(async (file) => {
        const url = await uploadOnCloudinary(file.path);
        return {
          url: url,
          altText: name
        }
      })
    );
   

    const parsedTags = JSON.parse(tags || "[]")
    const parsedSizes = JSON.parse(sizes || "[]")
    const parsedColors = JSON.parse(colors || "[]")
    const parsedDimensions = JSON.parse(dimensions || "{}")

    if (parsedSizes.length === 0) {
      return res.status(400).json({
        message: "Please enter at least one size"
      });
    }

    if (parsedColors.length === 0) {
      return res.status(400).json({
        message: "Please enter at least one color"
      });
    }

    // create product
    const createdProduct = await Product.create({
      name, description, price: Number(price), discountPrice: discountPrice !== "" ? Number(discountPrice) : undefined, countInStock: countInStock !== "" ? Number(countInStock) : 0, category, brand,
      sizes: parsedSizes,
      colors: parsedColors, collections, material, gender,
      images: imageUrl,
      isFeatured: isFeatured === "true",
      isPublished: isPublished === "true",
      dimensions: {
        length: Number(parsedDimensions.length) || 0,
        width: Number(parsedDimensions.width) || 0,
        height: Number(parsedDimensions.height) || 0,
      },
      weight: weight !== "" ? Number(weight) : undefined,
      sku,
      user: req.user._id,
      tags: parsedTags
    })

    res.status(201).json(createdProduct)
  } catch (error) {
   
    if (error.code === 11000) {
      return res.status(400).json({
        message: "SKU already"
      })
    }
    res.status(500).json({
      message: "Product creating failed"
    })
  }
}

export const productUpdateById = async (req, res) => {
  try {
    const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, isFeatured, isPublished, tags, dimensions, weight, sku, existingImages } = req.body;

    // find
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }

    let parsedExistingImages = [];

    if (existingImages) {
      parsedExistingImages = JSON.parse(existingImages);
    }

    const newImagesCount = req.files ? req.files.length : 0;
    const totalImages = parsedExistingImages.length + newImagesCount;
    if (totalImages > 5) {
      return res.status(400).json({
        message: "Maximum 5 images are allowed"
      })
    }

    let uploadImages = [];
    if (req.files && req.files.length) {
      uploadImages = await Promise.all(
        req.files.map(async (file) => {
          const url = await uploadOnCloudinary(file.path);
          return {
            url: url,
            altText: name
          }
        })
      );
    }
    const finalImages = [
      ...parsedExistingImages, ...uploadImages
    ]

    const parsedTags = JSON.parse(tags || "[]")
    const parsedSizes = JSON.parse(sizes || "[]")
    const parsedColors = JSON.parse(colors || "[]")
    const parsedDimensions = JSON.parse(dimensions || "{}")

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = Number(price) || product.price;
    product.discountPrice = discountPrice !== "" ? Number(discountPrice) : undefined;
    product.countInStock = Number(countInStock);
    product.category = category;
    product.brand = brand;
    product.sizes = parsedSizes;
    product.colors = parsedColors;
    product.collections = collections;
    product.material = material;
    product.gender = gender || undefined;
    product.images = finalImages;
    product.isFeatured = isFeatured === "true";
    product.isPublished = isPublished === "true";
    product.tags = parsedTags;
    product.dimensions = {
      length: Number(parsedDimensions.length) || 0,
      width: Number(parsedDimensions.width) || 0,
      height: Number(parsedDimensions.height) || 0
    };
    product.weight = weight !== "" ? Number(weight) : undefined;
    product.sku = sku;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct)

  } catch (error) {
   
    res.status(500).json({
      message: "Product update failed"
    })
  }
}

export const productDeleteById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Delete product successfully"
    })

  } catch (error) {
   
    res.status(500).json({
      message: "Product deletion failed"
    })
  }
}