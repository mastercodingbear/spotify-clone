import api from "../../../utils/api";

const getFeaturedList = (token, country, limit) => async (dispatch) => {
  try {
    const res = await api.get("/browse/featured-playlists", {
      headers: {
        Authorization: `Bearer ${
          token || window?.localStorage?.getItem("token")
        }`,
      },
      params: {
        country: country || "EG",
        limit: limit || 5,
      },
    });
    if (res.data.playlists.items.length <= 5)
      dispatch({
        type: "GET_FEATURED_PLAYLISTS",
        payload: { msg: res.data.message, items: res.data.playlists.items },
      });
    else {
      dispatch({
        type: "GET_GENRE_FEATURED_PLAYLISTS",
        payload: { msg: res.data.message, items: res.data.playlists.items },
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_FEATURED_PLAYLISTS",
      payload: { msg: "Something wrong happened!", items: [] },
    });
  }
};

export default getFeaturedList;
