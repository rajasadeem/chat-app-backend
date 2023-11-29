import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1];

    if (!token) throw new Error("Access Denied");

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    const userExist = await User.findById(decoded.id);

    if (!userExist) throw new Error("Token Expired");

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: error.message,
    });
  }
};
