const express = require("express");
//const upload = require("../middleware/uploadMiddleware/uploadImages");
const { addTrip } = require("../controllers/addTrip");
const {
  multerUploads,
} = require("../middleware/uploadMiddleware/uploadImages");
const addTripRouter = express.Router();

//addTripRouter.post("/", uploadImgTrip, addTrip);
addTripRouter.post("/", multerUploads, addTrip);

module.exports = addTripRouter;
// import multer from ‘multer’;
// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single(‘image’);
// export { multerUploads };
// app.post("/upload", multerUploads, (req, res) => {
//   console.log("req.body :", req.body);
// });
