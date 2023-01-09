export default (artists = { msg: null, items: [] }, action) => {
  if (action.type === "GET_TOP_LIKED_ARTISTS") {
    return { msg: action.payload.msg, items: action.payload.items };
  }
  return artists;
};
