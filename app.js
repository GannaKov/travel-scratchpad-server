const express = require("express");
//import cookieParser from 'cookie-parser';
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRouter.js");
const travelsRouter = require("./routes/travelsRouter.js");
const tripPurposeRouter = require("./routes/tripPurposeRouter.js");
const restrictedTravelsRouter = require("./routes/restrictedTravelsRouter.js");
//const addTripRouter = require("./routes/addTripRouter.js");
const accommodationRouter = require("./routes/accommodationRouer.js");
require("dotenv").config();
const cors = require("cors");
const app = express();

const corsOptions = {
  credentials: true,
  //origin: process.env.URL || "*",
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
//app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // what is it

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
//------
app.use("/api/trips", travelsRouter);
app.use("/api/own_trips", restrictedTravelsRouter);
app.use("/api/trip-purpose", tripPurposeRouter);
app.use("/api/accommodation", accommodationRouter);
//app.use("/api/add-trip", addTripRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log("err1", err);
    res.status(404).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;
  console.log("err2", err);
  res.status(status).json({ error: err.message });
});

module.exports = app;
