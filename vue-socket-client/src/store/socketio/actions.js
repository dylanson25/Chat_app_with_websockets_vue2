export const new_message = (state, message) => {
  state.io.emit("newMessage", message);
};

export const login = (state, name) => {
  state.io.emit("logi", username);
};
