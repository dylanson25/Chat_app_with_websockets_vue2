const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io", {
  cors: {
    origin: "http//localhost:8081",
  },
});
const io = new Server(server);

let users = {};

app.get("/", (req, res) => {
  res.send("Socketio...");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  /* eventos chat */
  // EVENT LOGIN
  socket.on("login", (username) => {
    console.log("LOGIN: ", username);

    if (users[username]) {
      socket.emit("USER_EXIST");
      return;
    }
    socket.username = username;
    users[username] = username;
    // console.log(socket);
    socket.emit("LOGIN", {
      username: socket.username,
      users,
    });
    socket.broadcast.emit("JOINED", {
      username: socket.username,
      users,
    });
  });
  //EVENT NEWMESSAGE
  socket.on("newMessage", (message) => {
    console.log("NEW MESSAGE");
    socket.broadcast.emit("NEW MESSAGE", `${socket.username}: message`);
    socket.emit("NEW_MESSAGE", `Yo: ${message}`);
  });
  //EVENT DISCONET
  socket.on("disconnect", () => {
    console.log("desconectado: ", socket.username);
    if (users[socket.username]) {
      delete users[socket.username];
      socket.broadcast.emit("USER_LEFT", {
        username: socket.username,
        users,
      });
    }
  });
});

server.listen(8081, () => {
  console.log("listening on *:8081");
});

module.exports = app;
