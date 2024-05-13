const express = require("express");

const authController = require("../controllers/auth/authController");

const authRouter = express.Router();

// register, post user //signUp
authRouter.post("/register", authController.signUp);

// login
authRouter.post("/login", authController.login);

//-------------------------------------
authRouter.get("/refresh_token", authController.refreshToken);

//--- log out
authRouter.delete("/refresh_token", authController.deleteToken);

module.exports = authRouter;
