import User from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";

export const userService = {
  add: async (data) => {
    const isExist = await userService.findByEmail(data.email);

    if (isExist) throw new Error("email already taken");
    data.password = await bcrypt.hash(data.password, 10);
    const user = await User.create(data);
    return user;
  },
  login: async (data) => {
    const isExist = await userService.findByEmail(data.email);

    if (!isExist) throw new Error("Incorrect email");
    const validatePassword = await bcrypt.compare(
      data.password,
      isExist.password
    );

    if (!validatePassword) throw new Error("Incorrect password");
    const user = {
      id: isExist._id,
      name: isExist.name,
      email: isExist.email,
    };
    const token = await jwt.sign(user, envConfig.jwtSecret);
    return {
      token,
      user: isExist,
    };
  },
  findByEmail: async (email) => {
    return await User.findOne({ email });
  },
  findById: async (id) => {
    return await User.findById(id);
  },
  findAll: async () => {
    return await User.find();
  },
};
