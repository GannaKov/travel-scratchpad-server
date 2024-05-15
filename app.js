const express = require("express");
//import cookieParser from 'cookie-parser';
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRouter.js");
const travelsRouter = require("./routes/travelsRouter.js");
const tripPurposeRouter = require("./routes/tripPurposeRouter.js");
const restrictedTravelsRouter = require("./routes/restrictedTravelsRouter.js");
const userLocationsRouter = require("./routes/userLocarionsRouter.js");
const bodyParser = require("body-parser");
const accommodationRouter = require("./routes/accommodationRouer.js");
require("dotenv").config();
const cors = require("cors");
const app = express();

const corsOptions = {
  credentials: true,
  origin: process.env.URL,
  //origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// app.use(cors({ origin: ["*"], methods: ["*"] }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     optionsSuccessStatus: 200,
//   })
// );

//"http://localhost:5173"
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://travel-scratchpad.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
//------
app.use("/api/trips", travelsRouter);
app.use("/api/own_trips", restrictedTravelsRouter);
app.use("/api/trip-purpose", tripPurposeRouter);
app.use("/api/accommodation", accommodationRouter);
app.use("/api/user-locations", userLocationsRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;

  res.status(status).json({ error: err.message });
});

module.exports = app;
