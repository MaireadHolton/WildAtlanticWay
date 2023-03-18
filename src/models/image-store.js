import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

// set cloudinary credentials to connect to cloudinary service
const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

export const imageStore = {

  // function to get images uploaded to cloudinary
  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  // function to upload an image to cloudinary
  uploadImage: async function(imagefile) {
    writeFileSync("./images/kinsale.jpg", imagefile);
    const response = await cloudinary.uploader.upload("./images/temp.img");
    return response.url;
  },

  // function to delete an image
  deleteImage: async function(img) {
    await cloudinary.uploader.destroy(img, {});
  }
};
