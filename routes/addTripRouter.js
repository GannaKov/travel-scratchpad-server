const express = require("express");

const { addTrip, updateTrip, updateTrip2 } = require("../controllers/addTrip");
const {
  multerUploads,
  multerMultyUploads,
} = require("../middleware/uploadMiddleware/uploadImages");
const addTripRouter = express.Router();

//addTripRouter.post("/", multerUploads, addTrip);
addTripRouter.post("/", multerMultyUploads, addTrip);
//addTripRouter.put("/:id", multerUploads, updateTrip);
addTripRouter.put("/:id", multerMultyUploads, updateTrip);

module.exports = addTripRouter;
