import Chat from "../database/models/chat.model.js";

export const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("socket connected");

    socket.on("sendMessage", async (data) => {
      try {
        const { sender, receiver } = data;

        if (!sender || !receiver)
          throw new Error("Sender and Receiver both are required");

        const chat = await Chat.find({
          $or: [
            { $and: [{ sender }, { receiver }] },
            { $and: [{ sender: receiver }, { receiver: sender }] },
          ],
        });
        if (chat.length >= 0) {
          data.roomId = chat[0].roomId;
        } else {
          const newChatId = sender.concat(receiver);
          data.roomId = newChatId;
        }
        const newMessage = await Chat.create(data);
        if (!newMessage) {
          throw new Error("error sending message...");
        } else {
          // io.to(roomId).emit("receiveMessage", newMessage);
          io.emit(`receiveMessage:${sender}`, newMessage);
          io.emit(`receiveMessage:${receiver}`, newMessage);
        }
      } catch (error) {
        socket.emit("errorMessage", {
          error: error.message,
        });
        console.error("Error saving message:", error);
      }
    });
    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`Socket left room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  });
};
