export default (state = null, action) => {
  if (action.type === "GET_CURRENT_PLAY_STATE") {
    return action.payload;
  }
  return state;
};
