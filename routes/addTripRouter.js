// const express = require("express");
// const authentication = require("../middleware/authentication");

// const { addTrip, updateTrip, updateTrip2 } = require("../controllers/addTrip");
// const {
//   multerUploads,
//   multerMultyUploads,
// } = require("../middleware/uploadMiddleware/uploadImages");
// const addTripRouter = express.Router();

// //addTripRouter.post("/", multerUploads, addTrip);
// addTripRouter.post("/", authentication, multerMultyUploads, addTrip);
// //addTripRouter.put("/:id", multerUploads, updateTrip);
// addTripRouter.put("/:id", authentication, multerMultyUploads, updateTrip);

// module.exports = addTripRouter;
