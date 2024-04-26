const express = require("express");

const { addTrip, updateTrip } = require("../controllers/addTrip");
const {
  multerUploads,
} = require("../middleware/uploadMiddleware/uploadImages");
const addTripRouter = express.Router();

addTripRouter.post("/", multerUploads, addTrip);
addTripRouter.put("/:id", multerUploads, updateTrip);

module.exports = addTripRouter;
