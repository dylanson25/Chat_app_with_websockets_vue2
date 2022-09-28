export const getUserName = (state) => {
  return state.userName;
};
export const usersList = (state) => {
  return state.usersList;
};

export const getToUser = (state) => (uid) => {
  const user = state.usersList.filter((user) => user.uid.includes(uid));
  return user[0];
};

export const getChatGlobal = (state) => {
  return state.chatRooms[0].messages;
};

export const getChatMessages = (state) => (toUserUid) => {
  const user = state.users.filter((user) => user.uid == state.uid);
  const chat = user[0].chats.filter((chat) => chat.toUserUid == toUserUid);
  if (chat.length == 0) return [];

  const chatRoom = state.chatRooms.filter(
    (chatRoom) => chatRoom.id == chat[0].id
  );
  return chatRoom[0].messages;
};
