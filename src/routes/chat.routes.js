import express from "express";
import { chatController } from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const chatRouter = express.Router();

chatRouter.get(
  "/:roomId",
  isAuthenticated,
  chatController.getChatWithSingleUser
);

export default chatRouter;
