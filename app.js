const express = require("express");
//import cookieParser from 'cookie-parser';
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes.js");
const travelsRouter = require("./routes/travelsRouter.js");
const tripPurposeRouter = require("./routes/tripPurposeRouter.js");
const addTripRouter = require("./routes/addTripRouter.js");
const accommodationRouter = require("./routes/accommodationRouer.js");
require("dotenv").config();
const cors = require("cors");
const app = express();

//Options????
// const corsOptions = {
//   credentials: true,
//   origin: process.env.URL || "*",
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//const path = require('path');
app.use("/api/users", authRouter);
app.use("/trips", travelsRouter);
app.use("/trip-purpose", tripPurposeRouter);
app.use("/accommodation", accommodationRouter);
app.use("/add-trip", addTripRouter);
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;

  res.status(status).json({ message });
});

module.exports = app;
