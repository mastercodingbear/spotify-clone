export default (list = { msg: null, items: [] }, action) => {
  if (action.type === "GET_FEATURED_PLAYLISTS") {
    return {
      msg: action.payload.msg,
      items: action.payload.items,
    };
  }
  return list;
};
