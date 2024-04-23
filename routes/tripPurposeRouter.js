const express = require("express");
const { getAllTripsPurpose } = require("../controllers/tripPurposeController");

const tripPurposeRouter = express.Router();

tripPurposeRouter.get("/", getAllTripsPurpose);

module.exports = tripPurposeRouter;
