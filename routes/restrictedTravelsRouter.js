const express = require("express");
const authentication = require("../middleware/authentication");
const restrictedController = require("../controllers/restrictedTravelController");
const {
  // multerUploads,
  multerMultyUploads,
} = require("../middleware/uploadMiddleware/uploadImages");

const restrictedTravelsRouter = express.Router();

restrictedTravelsRouter.get(
  "/",
  authentication,
  restrictedController.getAllOwnTrips
);
restrictedTravelsRouter.delete(
  "/:id",
  authentication,
  restrictedController.deleteTripById
);
restrictedTravelsRouter.post(
  "/",
  authentication,
  multerMultyUploads,
  restrictedController.addTrip
);
restrictedTravelsRouter.put(
  "/:id",
  authentication,
  multerMultyUploads,
  restrictedController.updateTrip
);
module.exports = restrictedTravelsRouter;
