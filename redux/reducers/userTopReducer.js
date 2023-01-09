export default (state = {}, action) => {
  if (action.type === "SET_USER_TOP_ITEMS") {
    return action.payload;
  }
  return state;
};
