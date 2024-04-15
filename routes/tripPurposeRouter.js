const express = require("express");
const { getAllTripsPurpose } = require("../controllers/tripPurposeController");

tripPurposeRouter = express.Router();

tripPurposeRouter.get("/", getAllTripsPurpose);

module.exports = tripPurposeRouter;
