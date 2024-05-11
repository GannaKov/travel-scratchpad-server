const userRouter = require("express").Router();
const authentication = require("../middleware/authentication");

//const { isAuthenticated } = require("../middleware/auth");

const usersController = require("../controllers/usersController");

// userRouter.get("/", isAuthenticated, usersController.getUsersList);
//get user
userRouter.get("/:id", usersController.getUserById);

//get all users
userRouter.get("/", usersController.getAllUsers);

// userRouter.get("/me", isAuthenticated, usersController.getAuthenticatedUser);

// userRouter.get("/:id", isAuthenticated, usersController.getUserById);

module.exports = userRouter;
