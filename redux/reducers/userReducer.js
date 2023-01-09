export default (user = null, action) => {
  if (action.type === "UPDATE_USER_STATE") {
    return action.payload;
  }
  return user;
};
