const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtTokens, clearTokens } = require("../utils/jwtHelpers");
const User = require("../models/userModel");
const authentication = require("../middleware/authentication");
const authController = require("../controllers/auth/authController");

const authRouter = express.Router();

// register, post user //signUp
authRouter.post("/register", authController.signUp);

// login
authRouter.post("/login", authController.login);

///////router.post("/login", authController.login, authMiddleware.generateAuthTokens);

//-------------------------------------
authRouter.get("/refresh_token", authController.refreshToken);
//////router.post("/refresh", authController.refreshAccessToken);

//------------------
authRouter.get("/refresh_token", authController.refreshToken);
authRouter.delete("/refresh_token", authController.deleteToken);

module.exports = authRouter;
