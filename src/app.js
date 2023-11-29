import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import morgan from "morgan";
import { socketEvents } from "./chat/chat.events.js";
import chatRouter from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Test
app.use("/", async (req, res) => {
  res.json("Server Running");
});

//http server for socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

//socket events for messages
socketEvents(io);

//Application Routes
app.use("/user", userRouter);
app.use("/chat", chatRouter);

export default server;
