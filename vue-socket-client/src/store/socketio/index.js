import state from "./state";
import * as mutations from "./mutations";
const socketio = {
  namespaced: true,
  state,
  mutations,
  //   getters: {},
  //   actions: {
  //     //emitimos acciones desde nuestra app al servidor de nodejs con socket.io
  //   },
};

export default socketio;
