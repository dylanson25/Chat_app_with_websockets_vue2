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

let users = [];
let userList = [];
let chatRooms = [
  {
    id: "wj3UfZTmCO_tHTodAAAF",
    messages: [
      {
        userName: "Chat-App",
        msg: "Bienvenido al chat global",
      },
    ],
  },
];
/**
 * Arrego de objetos con la informacion del usario se crea cuando se hace login
 * users{
 *    {
    uid: 1,
    userName: "Dylan",
    chats: [{ id: "wj3UfZTmCO_tHTodAAAF", name: "Chat Globlal" }],
  },
  {
    uid: 2,
    userName: "Ximena",
    chats: [{ id: "wj3UfZTmCO_tHTodAAAF", name: "Chat Globlal" }],
  },
  {
    uid: 3,
    userName: "Sierra",
    chats: [{ id: "wj3UfZTmCO_tHTodAAAF", name: "Chat Globlal" }],
  },
 * }
 * -------------------------------------
 * listado de usarios conectados
 * usersList ["Dylan", "Ximena", "Sierra"]
 * -------------------------------------
 * Arrglode objetos con los chats entre usarios
 * chats{
 *    id
 *     messages [
 *        {
 *          userName,
 *          msg,
 *        }
 *        {
 *          userName,
 *          msg,
 *        }
 * ]
 * }
 *
 */

const userUIDFilter = (uid) => {
  const user = users.filter((user) => user.uid === uid);
  return user.length != 0 ? user : false;
};

const chatRoomsUIDFilter = (id) => {
  const chatRoom = chatRooms.filter((chatRoom) => chatRoom.id === id);
  return chatRoom.length != 0 ? chatRoom : false;
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // EVENT LOGIN
  socket.on("login", ({ uid, userName }) => {
    console.log("LOGIN: " + userName);

    if (userUIDFilter(uid)) {
      socket.emit("USER_EXIST");
      return;
    }

    socket.user = { uid, userName };
    users.push({
      uid,
      userName,
      chats: [{ id: "wj3UfZTmCO_tHTodAAAF", name: "Chat Globlal" }],
    });

    socket.emit("LOGIN", {
      users,
      userName: userName,
      userList,
      chatRooms,
    });

    userList.push({ uid, userName });

    socket.broadcast.emit("JOINED", {
      userName: userName,
      userList,
      users,
    });
  });
  //EVENT NEWMESSAGE
  socket.on("newMessage", ({ id, message, toUserUid }) => {
    console.log("NEW MESSAGE");

    let chatRoom = chatRoomsUIDFilter(id);

    if (!chatRoom) {
      //Si no existe se crea
      const idx = users.findIndex(({ uid }) => toUserUid === uid);
      users[idx].chats.push(id);

      chatRooms.push({
        id,
        messages: [{ userName: socket.user.name, msg: message }],
      });

      socket.emit("UPDATE_USERS", users);
    } else {
      chatRoom.messages.push({ userName: socket.user.name, msg: message });

      const idx = chatRooms.findIndex(({ id }) => chatRoom.id === id);
      chatRooms[idx] = chatRoom;
    }
    socket.broadcast.emit("NEW_MESSAGE", `${socket.user.name}: ${message}`);
    socket.emit("LOAD_CHAT", chatRooms);

    // socket.emit("NEW_MESSAGE", `Yo: ${message}`);
  });
  //EVENT DISCONET
  socket.on("disconnect", () => {
    console.log("DISCONNECTED: ", socket.user?.userName);

    let user = userUIDFilter(socket.user);

    if (user) {
      const idx = users.findIndex(({ uid }) => user.uid === uid);
      users.splice(idx, 1);

      const uidx = userList.findIndex(({ uid }) => user.uid === uid);
      userList.splice(uidx, 1);

      socket.broadcast.emit("USER_LEFT", {
        userName: socket.user.userName,
        users,
        userList,
      });
    }
  });
});

server.listen(8081, () => {
  console.log("listening on *:8081");
});

module.exports = app;
