import Chat from "../database/models/chat.model.js";
import { userService } from "../services/user.service.js";

export const chatController = {
  getChatWithSingleUser: async (req, res) => {
    try {
      const chat = await Chat.find({ roomId: req.params.roomId })
        .sort({ createdAt: -1 })
        .limit(100);

      return res.status(200).json({
        status: 200,
        message: "chat reterieved",
        data: chat.reverse(),
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },

  getAllChatsOfUser: async (req, res) => {
    try {
      const { id } = req.user;
      const chatsData = await Chat.find({
        $or: [{ sender: id }, { receiver: id }],
      }).populate("receiver");

      const chatsByRoomId = {};

      chatsData.forEach((chat) => {
        const { roomId } = chat;

        chatsByRoomId[roomId] = chatsByRoomId[roomId] || {
          roomId,
          receiver: "",
          lastMessage: {},
          messages: [],
        };

        chatsByRoomId[roomId].messages.push(chat);
      });

      const formattedData = Object.values(chatsByRoomId);

      const response = await Promise.all(
        formattedData.map(async (e) => {
          const receiverId = e.roomId.replace(id, "");
          const userData = await userService.findById(receiverId);
          e.receiver = userData.name;
          const lastMessage = e.messages[e.messages.length - 1];
          e.lastMessage = lastMessage;
          return e;
        })
      );

      return res.status(200).json({
        status: 200,
        message: "Chats retrieved",
        data: response,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },

  // sendMessage: async (req, res) => {
  //   try {
  //     const { id } = req.user;
  //     req.body.sender = id;
  //     const { sender, receiver } = req.body;

  //     if (!sender || !receiver)
  //       throw new Error("Sender and Receiver both are required");

  //     const chat = await Chat.find({
  //       $or: [
  //         { $and: [{ sender }, { receiver }] },
  //         { $and: [{ sender: receiver }, { receiver: sender }] },
  //       ],
  //     });
  //     // console.log(chat);
  //     if (chat.length > 0) {
  //       req.body.roomId = chat[0].roomId;
  //     } else {
  //       const newChatId = sender.concat(receiver);
  //       req.body.roomId = newChatId;
  //     }
  //     const newMessage = await Chat.create(req.body);
  //     if (!newMessage) {
  //       throw new Error("error sending message...");
  //     } else {
  //       // io.to(roomId).emit("receiveMessage", newMessage);
  //       io.emit(`receiveMessage:${sender}`, newMessage);
  //       io.emit(`receiveMessage${receiver}`, newMessage);
  //     }

  //     const activeChat = await Chat.find({ roomId: req.body.roomId });

  //     return res.status(200).json({
  //       chat: activeChat,
  //     });
  //   } catch (error) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: error.message,
  //     });
  //   }
  // },
};
