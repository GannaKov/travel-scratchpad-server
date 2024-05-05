const express = require("express");
const authentication = require("../middleware/authentication");
const restrictedController = require("../controllers/restrictedTravelController");

// const { query } = require("express-validator");
// const { body } = require("express-validator");
const restrictedTravelsRouter = express.Router();

restrictedTravelsRouter.get(
  "/",
  authentication,
  restrictedController.getAllOwnTrips
);
module.exports = restrictedTravelsRouter;
