import { generateUUID } from "@/utils";

//ahora  debe recibir un objeto con el id del chat si no existecrearlo
export const new_message = ({ state }, { message, toUserUid }) => {
  const user = state.users.filter((user) => user.uid == state.uid);
  const chat = user[0].chats.filter((chat) => chat.toUserUid == toUserUid);
  state.io.emit("newMessage", {
    id: chat.length > 0 ? chat[0].id : generateUUID(),
    message,
    toUserUid,
  });
};
export const new_global_message = ({ state }, message) => {
  state.io.emit("newMessage", {
    id: "wj3UfZTmCO_tHTodAAAF",
    message,
  });
};

export const login = ({ state }, userName) => {
  state.io.emit("login", { uid: state.io.id, userName });
};
