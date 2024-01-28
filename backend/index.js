const http = require("http");
// Load environment variables from .env file
require("dotenv").config();

const { Server } = require("socket.io");
// Get the port from the environment variables
const port = process.env.APP_PORT;

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

const players = [];
const sockets = [];
io.on("connection", (socket) => {
  console.info(`User Connected : ${socket.id}`);

  socket.on("join room", async (data) => {
    players.push(data.pseudo);
    sockets.push(socket.id);
    socket.join(data);
    await io.emit("room_players", players);
    console.info(`${data.pseudo} joined room: ${data.gameRoom}`);
  });

  socket.on("player_choice", async (data) => {
    await io.emit("receive_choice", data);
  });

  socket.on("disconnect", () => {
    const index = sockets.indexOf(socket.id);
    players.splice(index, 1);
    sockets.splice(index, 1);
    console.info(players, sockets);
    console.info(`User Disconnected : ${socket.id}`);
  });
});

// Start the server and listen on the specified port
server
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
