const createError = require("http-errors");
const User = require("../../models/userModel");
const { jwtTokens } = require("../../utils/jwtHelpers");
const bcrypt = require("bcrypt");
const ms = require("ms");
const userRouter = require("../../routes/userRouter");
const jwt = require("jsonwebtoken");

//signUp
const signUp = async (req, res, next) => {
  try {
    //console.log("req.body", req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw { status: 422, message: "Please fill all the required fields" };
      //   return res.status(422).json({
      //     status: "Unprocessable Content",
      //     code: 422,
      //     message: "Please fill all the required fields",
      //     //data:""
      //   });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({
        status: "Unprocessable Content",
        code: 422,
        message: "Email already exists",
        //data: "Conflict",
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
};

// login

const login = async (req, res, next) => {
  //   console.log("req.body", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log("user", user);
    if (!user) {
      throw { status: 400, message: "Email is incorrect" };
      //   return res.status(400).json({
      //     status: "error",
      //     code: 400,
      //     message: "Incorrect login ",
      //     data: "Bad request",
      //   });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw { status: 400, message: "Incorrect password" };
      //   return res.status(400).json({
      //     status: "error",
      //     code: 400,
      //     message: "Incorrect password",
      //     data: "Bad request",
      //   });
    }
    //----
    const expiresAt = ms(process.env.ACCESS_TOKEN_LIFE);
    // const payload = {
    //   ...user,
    //   expiresAt,
    // };

    //---
    let tokens = jwtTokens(user, expiresAt);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      //maxAge: ms(process.env.ACCESS_TOKEN_LIFE),
    });

    res.json({
      status: "success",
      code: 200,
      data: {
        tokens,
        user: { email: user.email, id: user._id },
        expiresAt,
      },
    });
    // req.userId = user.id;
    // return next();
  } catch (error) {
    next(error);
  }
};

//refresh
const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(204);
    }
    console.log(refreshToken);
    if (refreshToken === null) {
      return res.status(401).json({ error: "Null refresh token" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        const expiresAt = ms(process.env.ACCESS_TOKEN_LIFE);
        let tokens = jwtTokens(user, expiresAt);
        // res.cookie("refresh_token", tokens.refreshToken, {
        //   httpOnly: true,
        // });
        //we need only ACCESS_TOKEN!!!
        console.log("tockens", tokens);
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// logout
const deleteToken = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Refresh token deleted." });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
module.exports = {
  signUp,
  login,
  refreshToken,
  deleteToken,
};
