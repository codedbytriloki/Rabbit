import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary environment variables are missing")
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "rabbit/products",
      resource_type: "image"
    })

    try {
      await fs.promises.unlink(filePath)
    } catch (deleteError) {
      console.error("Temporary file delete failed:", deleteError.message)
    }

    return result.secure_url
  } catch (error) {
    console.error("Cloudinary upload error:", {
      message: error.message,
      http_code: error.http_code,
      name: error.name
    })

    try {
      await fs.promises.unlink(filePath)
    } catch {
      // The file may already be deleted or unavailable.
    }

    throw error
  }
}

export default uploadOnCloudinary
