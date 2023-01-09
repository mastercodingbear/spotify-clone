export default (albums = { msg: null, items: [] }, action) => {
  if (action.type === "GET_TOP_LIKED_TRACKS") {
    return { msg: action.payload.msg, items: action.payload.items };
  }
  return albums;
};
