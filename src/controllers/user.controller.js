import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userController = {
  register: async (req, res) => {
    try {
      const { email } = req.body;
      const isExist = await User.findOne({ email });

      if (isExist) throw new Error("email already taken");

      req.body.password = await bcrypt.hash(req.body.password, 10);

      const user = await User.create(req.body);

      return res.status(201).json({
        status: 201,
        message: "User Created",
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
      const { email } = req.body;
      const isExist = await User.findOne({ email });

      if (!isExist) throw new Error("Incorrect Email");
      const validatePassword = await bcrypt.compare(
        req.body.password,
        isExist.password
      );

      if (!validatePassword) throw new Error("password doesn't match");

      const payload = {
        id: isExist._id,
        name: isExist.name,
        email: isExist.email,
      };
      const accessToken = await jwt.sign(payload, "MySecretKeyForJWTToken");

      return res.status(200).json({
        status: 200,
        message: "Login Successfull",
        data: {
          token: accessToken,
          user: payload,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

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
};
