import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { userValidation } from "../validation/user.validation.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(userValidation.register),
  userController.register
);

userRouter.post("/login", validate(userValidation.login), userController.login);

userRouter.get("/", isAuthenticated, userController.getUserData);

userRouter.get("/all", isAuthenticated, userController.getAllUsers);

export default userRouter;
