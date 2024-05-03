const userRouter = require("express").Router();

//const { isAuthenticated } = require("../middleware/auth");

const usersController = require("../controllers/usersController");

// userRouter.get("/list", isAuthenticated, usersController.getUsersList);

// userRouter.get("/me", isAuthenticated, usersController.getAuthenticatedUser);

// userRouter.get("/:id", isAuthenticated, usersController.getUserById);

module.exports = userRouter;
