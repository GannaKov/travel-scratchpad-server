const express = require("express");
const authentication = require("../middleware/authentication");
// const { query } = require("express-validator");
// const { body } = require("express-validator");
const travelsRouter = express.Router();

const {
  getAllTrips,
  // postCountry,
  getTripById,
  deleteTripById,
  // updateCountry,
  // //deleteCountry,
  // toggleVisitedStatus,
} = require("../controllers/travelController");

travelsRouter.get("/", getAllTrips);

travelsRouter.get("/:id", getTripById);

travelsRouter.delete("/:id", authentication, deleteTripById);
//travelsRouter.delete("/:id", deleteTripById);

module.exports = travelsRouter;
