const express = require("express");

const { addTrip, updateTrip } = require("../controllers/addTrip");
const {
  multerUploads,
} = require("../middleware/uploadMiddleware/uploadImages");
const addTripRouter = express.Router();

addTripRouter.put("/", multerUploads, addTrip);
//addTripRouter.put("/", updateTrip);

module.exports = addTripRouter;
