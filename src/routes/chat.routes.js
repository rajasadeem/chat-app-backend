import express from "express";
import { chatController } from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const chatRouter = express.Router();

chatRouter.get(
  "/:roomId",
  isAuthenticated,
  chatController.getChatWithSingleUser
);

chatRouter.get("/", isAuthenticated, chatController.getAllChatsOfUser);

chatRouter.post("/message", isAuthenticated, chatController.sendMessage);

export default chatRouter;
