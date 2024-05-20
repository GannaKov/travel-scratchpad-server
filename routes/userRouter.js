const userRouter = require("express").Router();
const authentication = require("../middleware/authentication");

const usersController = require("../controllers/usersController");

//get user
userRouter.get("/:id", usersController.getUserById);

//get all users
userRouter.get("/", usersController.getAllUsers);

//---- change user (avatar)
userRouter.put("/:id", authentication, usersController.changeUser);

module.exports = userRouter;
