//mutaciones, seran ejecutadas por Node.js y deben de comenzar por SOCKET_
export const setSocket = (state, socket) => {
  state.io = socket;
};

export const SET_NAME = (state, name) => {
  state.name = name;
};

export const NEW_MESSAGE = (state, message) => {
  state.chat.push(message[0]);
};

export function SOCKET_LOGIN(state, data) {
  console.log("aqui");
  state.users = data[0].users;
  state.name = data[0].username;
}

export const USER_EXIST = (state) => {
  console.log("first");
  state.exist = true;
};

export const USER_JOINED = (state, data) => {
  state.users = data[0].users;
  state.chat.push(`Usuario ${data[0].username} ha entrado en la sala`);
};

export const USER_LEFT = (state, data) => {
  state.users = data[0].users;
  state.chat.push(`Usuario ${data[0].username} ha abandonado en la sala`);
};
