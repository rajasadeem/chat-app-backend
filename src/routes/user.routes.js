import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/:id", isAuthenticated, userController.getUserById);

export default userRouter;
