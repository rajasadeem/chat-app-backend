import Chat from "../model/chat.model.js";

export const chatController = {
  getChatWithSingleUser: async (req, res) => {
    try {
      const { roomId } = req.query;
      const chat = await Chat.find({ roomId });

      return res.status(200).json({
        status: 200,
        message: "chat reterieved",
        data: chat,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },

  //   getAllChatsOfUser: async (req, res) => {
  //     try {
  //       const { sender, receiver } = req.query;
  //       const chats = await Chat.find({ $and: [{ sender }, { receiver }] });

  //     } catch (error) {
  //       return res.status(400).json({
  //         status: 400,
  //         message: error.message,
  //       });
  //     }
  //   },
};
