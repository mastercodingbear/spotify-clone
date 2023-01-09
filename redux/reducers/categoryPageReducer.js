export default (state = { msg: null, items: [] }, action) => {
  if (action.type === "GET_CATEGORY_ALL_PLAYLISTS") {
    return { msg: action.payload.msg, items: action.payload.items };
  }
  if (action.type === "CLEAR_REDUCER") {
    return action.payload;
  }
  return state;
};
