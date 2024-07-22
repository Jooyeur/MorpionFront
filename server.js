import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);

let rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("createGame", () => {
    const roomId = Math.random().toString(36).substring(2, 7);
    rooms[roomId] = [socket.id];
    socket.join(roomId);
    socket.emit("gameCreated", { gameId: roomId, playerId: socket.id });
  });

  socket.on("joinGame", (roomId) => {
    if (rooms[roomId] && rooms[roomId].length < 2) {
      rooms[roomId].push(socket.id);
      socket.join(roomId);
      socket.emit("gameJoined", { gameId: roomId, playerId: socket.id });
      io.to(roomId).emit("startGame", { roomId, players: rooms[roomId] });
    } else {
      socket.emit("error", { message: "Room is full or does not exist." });
    }
  });

  socket.on("move", ({ roomId, index, value }) => {
    io.to(roomId).emit("move", { index, value });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    for (let roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

const port = 4000;
server.listen(port, () => console.log(`Listening on port ${port}`));
