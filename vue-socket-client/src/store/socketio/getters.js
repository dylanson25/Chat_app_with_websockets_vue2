export const userName = (state) => {
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
