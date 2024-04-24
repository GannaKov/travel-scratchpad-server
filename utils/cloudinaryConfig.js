const { config, uploader } = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryConfig = config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  folder: "travel-scratchpad",
});

module.exports = { cloudinaryConfig, uploader };
