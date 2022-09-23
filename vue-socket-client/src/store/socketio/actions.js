import VueSocketIO from "vue-socket.io";
export const new_message = ({ state }, message) => {
  state.io.emit("newMessage", message);
};

export const login = ({ state, commit }, name) => {
  state.io.emit("login", name);
  commit("SET_NAME", name);
};

//funcionando
// export function SOCKET_LOGIN({ state }, data) {
//   console.log("aqui");
// }
