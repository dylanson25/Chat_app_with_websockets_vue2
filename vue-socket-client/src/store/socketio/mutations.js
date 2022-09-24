// mutaciones, seran ejecutadas por Node.js y deben de comenzar por SOCKET_
export const setSocket = (state, socket) => {
  state.io = socket;
};

// export const SOCKET_SET_NAME = (state, name) => {
//   state.name = name;
// };

// export const SOCKET_NEW_MESSAGE = (state, message) => {
//   state.chat.push(message[0]);
// };

export const SOCKET_LOGIN = (state, data) => {
  console.log("SOCKET_LOGIN");
  const { userName, users, chatRooms, userList } = data;

  state.uid = state.io.id;
  state.users = users;
  state.userName = userName;
  state.usersList = userList;
  state.chatRooms = chatRooms;
};

// export const SOCKET_USER_EXIST = (state) => {
//   console.log("first");
//   state.exist = true;
// };

// // export const SOCKET_USER_JOINED = (state, data) => {
// //   console.log(data);
// //   state.users = data[0].users;
// //   state.chat.push(`Usuario ${data[0].username} ha entrado en la sala`);
// // };

// export const SOCKET_USER_LEFT = (state, data) => {
//   state.users = data[0].users;
//   state.chat.push(`Usuario ${data[0].username} ha abandonado en la sala`);
// };
