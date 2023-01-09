export default (token = null, action) => {
  if (action.type === "UPDATE_TOKEN_STATE") {
    return action.payload;
  }
  return token;
};
