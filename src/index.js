import server from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3001;

mongoose.connect("mongodb://127.0.0.1:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Add event listeners, will be called when the connection status changes
connection.once("connected", () => console.log("Database Connected ~"));
connection.once("error", () => console.log("Database Connection Failed ~"));

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
