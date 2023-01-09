export default (list = { msg: null, items: [] }, action) => {
  if (action.type === "GET_GENRE_RECENT_PLAYLISTS_ALL") {
    return {
      msg: action.payload.msg,
      items: [...list.items, action.payload.item],
    };
  }
  if (action.type === "GET_NEW_RELEASES_PLAYLISTS_ALL") {
    return {
      msg: action.payload.msg,
      items: [...list.items, action.payload.item],
    };
  }
  if (action.type === "GET_GENRE_FEATURED_PLAYLISTS") {
    return {
      msg: action.payload.msg,
      items: action.payload.items,
    };
  }

  if (action.type === "GET_TOP_LIKED_ARTISTS_ALL") {
    return {
      msg: action.payload.msg,
      items: action.payload.items,
    };
  }
  if (action.type === "GET_TOP_LIKED_TRACKS_ALL") {
    return {
      msg: action.payload.msg,
      items: action.payload.items,
    };
  }

  if (action.type === "CLEAR_REDUCER") {
    return { msg: null, items: [] };
  }
  return list;
};
