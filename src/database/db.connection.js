import mongoose from "mongoose";
import envConfig from "../config/env.config.js";

export const dbConnection = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(envConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  // Add event listeners, will be called when the connection status changes
  connection.once("connected", () => console.log("Database Connected ~"));
  connection.once("error", () => console.log("Database Connection Failed ~"));
};
