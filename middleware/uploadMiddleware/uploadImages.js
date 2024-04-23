const Multer = require("multer");
const cloudinary = require("cloudinary").v2;
//import { nanoid } from "nanoid";
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const recipeImgParams = {
  dimensions: {
    width: 500,
    height: 500,
  },
  maxFileSize: 1000000,
  acceptableFileTypes: ["jpg", "png", "jpeg"],
};

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

exports.module = upload;
