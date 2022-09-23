export const new_message = ({ state }, message) => {
  state.io.emit("newMessage", message);
};

export const login = ({ state, commit }, name) => {
  state.io.emit("login", name);
  commit("SOCKET_SET_NAME", name);
};

//funcionando
// export function SOCKET_LOGIN({ state }, data) {
//   console.log("aqui");
// }
