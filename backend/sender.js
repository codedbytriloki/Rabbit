import mongoose from "mongoose";
import dotenv from "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"
import Product from "./models/Product.js"
import User from "./models/User.js"
import { v2 as cloudinary } from "cloudinary"
import products from "./data/products.js"
import Cart from "./models/Cart.js";

const dataDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "data")


const seedData = async () => {
  try {

    // connect to mongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected");

    // clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany()

    const createdUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin"
    })

    console.log("Admin data seeded");

    for (const product of products) {
      const uploadedImages = [];

      for (const image of product.images) {
        const imagePath = path.resolve(dataDirectory, image.url)

        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        try {
          const result = cloudinary.uploader.upload(imagePath);
          uploadedImages.push({
            url: (await result).secure_url,
            altText: image.altText,
            public_id: (await result).public_id
          })
        } catch (error) {
          throw new Error(`Failed to upload ${imagePath} to Cloudinary`, { cause: error });
        }
      }

      const productData = {
        ...product,
        images: uploadedImages,
        user: createdUser._id
      }
      await Product.create(productData)
      console.log(`${product.name} added`);
    }
    console.log("Product data seeded successfully");
    process.exit()
  } catch (error) {
    console.error("Error seeding the data: ", error);
    process.exit(1)
  }
}




seedData();