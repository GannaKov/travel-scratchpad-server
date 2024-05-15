const express = require("express");
const {
  getLocationsByUserId,
  putLocationsByUserId,
} = require("../controllers/userLocationsController");

const userLocationsRouter = express.Router();

userLocationsRouter.get("/:userId", getLocationsByUserId);
userLocationsRouter.put("/:userId", putLocationsByUserId);

module.exports = userLocationsRouter;
// {"location": {"lat": 52.50474478891537, "lng": 13.409971573944212},
// "name": "Stallschreiberstraße 63, 10969 Berlin, Германия"}
