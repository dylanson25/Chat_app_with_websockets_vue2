//mutaciones, seran ejecutadas por Node.js y deben de comenzar por SOCKET_
export const setSocket = (state, socket) => {
  state.io = socket;
};
