const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwtHelpers");
const User = require("../models/userModel");
const authentication = require("../middleware/authentication");

const authRouter = express.Router();
//get user
authRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await User.find();

    if (result.length === 0) {
      throw { status: 404, message: "No user found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
//get all users
authRouter.get("/", async (req, res, next) => {
  try {
    const result = await User.find();

    if (result.length === 0) {
      throw { status: 404, message: "No user found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

// register, post user
authRouter.post("/register", async (req, res, next) => {
  try {
    //console.log("req.body", req.body);
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ status: "created ", code: 201, data: newUser });

    //----
  } catch (error) {
    next(error);
  }
});

// login
authRouter.post("/login", async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // throw { status: 409, message: "Email is incorrect" };
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login ",
        data: "Bad request",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect password",
        data: "Bad request",
      });
    }
    //----
    //??
    // const payload = {
    //   id: user._id,
    // };

    //---
    let tokens = jwtTokens(user);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
    });
    res.json(tokens);
  } catch (error) {
    next(error);
  }
});
//----------logout
authRouter.post("/logout", authentication, async (req, res, next) => {
  const userId = req.user.id;
  //   console.log("req.user", req.user);
  //   console.log("userId:", userId);
  try {
    //const result = await User.findByIdAndUpdate(userId, { token: "" });
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { token: "" } }
    );

    // console.log("result:", result);
    if (!result) {
      console.log("User not found or token not removed");
      return res
        .status(404)
        .json({ error: "User not found or token not removed" });
    }
    // res.status(204).json({ message: "Logout successful" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
});

//-------------------------------------
authRouter.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    // console.log(refreshToken);
    if (refreshToken === null)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, {
          httpOnly: true,
        });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
//------------------
authRouter.delete("/refresh_token", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Refresh token deleted." });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = authRouter;
