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

app.get("/", (req, res) => {
  res.send("Socketio...");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("mensaje", function (mensaje) {
    console.log("mensaje: " + mensaje);
  });
});

server.listen(8081, () => {
  console.log("listening on *:8081");
});

module.exports = app;
