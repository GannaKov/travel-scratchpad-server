const express = require("express");

const { addTrip } = require("../controllers/addTrip");
const {
  multerUploads,
} = require("../middleware/uploadMiddleware/uploadImages");
const addTripRouter = express.Router();

addTripRouter.post("/", multerUploads, addTrip);

module.exports = addTripRouter;
