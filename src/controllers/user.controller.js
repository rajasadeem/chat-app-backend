import User from "../database/models/user.model.js";
import { userService } from "../services/user.service.js";

export const userController = {
  register: async (req, res) => {
    try {
      const user = await userService.add(req.body);

      return res.status(201).json({
        status: 201,
        message: "Registered successfully, Please login to continue",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await userService.login(req.body);

      return res.status(200).json({
        status: 200,
        message: "Login Successfully",
        data: {
          token: user.token,
          user: user.user,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },

  getUserData: async (req, res) => {
    try {
      let user;
      req.query.id
        ? (user = await userService.findById(req.query.id))
        : (user = await userService.findById(req.user.id));

      if (!user) throw new Error("User not found");

      return res.status(200).json({
        status: 200,
        message: "user reterieved",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.findAll();

      return res.status(200).json({
        status: 200,
        message: "Users reterieved",
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
};
