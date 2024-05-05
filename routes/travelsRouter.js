const express = require("express");

const travelsRouter = express.Router();

const {
  getAllTrips,

  getTripById,
} = require("../controllers/travelController");

travelsRouter.get("/", getAllTrips);

travelsRouter.get("/:id", getTripById);

module.exports = travelsRouter;
