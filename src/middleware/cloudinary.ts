const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

export const uploadPhoto = async (photo: string) => await cloudinary.v2.uploader.upload(photo, {
  folder: "muni/uploads"
});