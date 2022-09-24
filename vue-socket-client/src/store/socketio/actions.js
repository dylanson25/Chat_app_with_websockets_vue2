import { generateUUID } from "@/utils";

export const new_message = ({ state }, message) => {
  const id = generateUUID();
  state.io.emit("newMessage", {
    id,
    message,
    toUserUid: state.uid,
  });
};

export const login = ({ state, commit }, userName) => {
  state.io.emit("login", { uid: state.io.id, userName });
};
