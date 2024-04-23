const express = require("express");
//const upload = require("../middleware/uploadMiddleware/uploadImages");
//const { addTrip } = require("../controllers/addTrip");

const addTripRouter = express.Router();
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
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
  //   limits: {
  //     fileSize: 1048576,
  //     files: 5,
  //   },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg format allowed!"));
    }
  },
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    //folder:'folder_name'
  });

  return res;
}
//addTripRouter.post("/", uploadImgTrip, addTrip);
addTripRouter.post("/", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    console.log("cldRes", cldRes.url);
    res.json(cldRes);
    //// Send the Cloudinary URL in the response
    // res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    //res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    res.send({
      message: error.message,
    });
  }
});

module.exports = addTripRouter;
// import multer from ‘multer’;
// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single(‘image’);
// export { multerUploads };
// app.post("/upload", multerUploads, (req, res) => {
//   console.log("req.body :", req.body);
// });
