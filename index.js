const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/db/dbconnect");
const Routes = require('./src/routes/route');
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./src/models/chat.modal'); // Import chat model

dotenv.config();

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(Routes);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (projectId) => {
    socket.join(projectId);
    console.log(`User joined room: ${projectId}`);
  });

  socket.on("chatMessage", async (messageData) => {
    const { projectId, sender, message } = messageData;


    const chatMessage = await Chat.create({ project: projectId, sender, message });

    io.to(projectId).emit("message", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDB();
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
