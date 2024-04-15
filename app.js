const express = require("express");

const travelsRouter = require("./routes/travelsRouter.js");
const tripPurposeRouter = require("./routes/tripPurposeRouter.js");
//require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//const path = require('path');

app.use("/trips", travelsRouter);
app.use("/trip-purpose", tripPurposeRouter);
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
