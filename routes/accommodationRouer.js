const express = require("express");
const {
  getAllAccommodationTypes,
} = require("../controllers/accommodationController");

accommodationRouter = express.Router();

accommodationRouter.get("/", getAllAccommodationTypes);

module.exports = accommodationRouter;
