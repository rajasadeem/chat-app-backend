import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  roomId: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
