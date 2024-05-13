const userRouter = require("express").Router();

const usersController = require("../controllers/usersController");

//get user
userRouter.get("/:id", usersController.getUserById);

//get all users
userRouter.get("/", usersController.getAllUsers);

module.exports = userRouter;
