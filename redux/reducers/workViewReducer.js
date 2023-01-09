export default (view = {}, action) => {
  if (action.type === "GET_PLAYLIST|ARTIST|ALBUM__VIEW") {
    return action.payload;
  }
  if (action.type === "CLEAR_REDUCER") {
    return action.payload;
  }
  return view;
};
