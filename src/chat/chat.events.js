import Chat from "../model/chat.model.js";

export const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("socket connected");
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`Socket joined room ${roomId}`);
    });
    socket.on("sendMessage", async (data) => {
      try {
        const { roomId } = data;
        const newMessage = await Chat.create(data);
        if (!newMessage) {
          throw new Error("error sending message...");
        } else {
          io.to(roomId).emit("receiveMessage", newMessage);
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
