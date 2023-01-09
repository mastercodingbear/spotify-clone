export default (list = [], action) => {
  if (action.type === "GET_BROWSE_CATEGORY_PLAYLISTS") {
    return [...list, action.payload];
  }
  return list;
};
