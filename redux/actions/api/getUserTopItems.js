import api from "../../../utils/api";

const getUserTopItems = (token, limit) => async (dispatch) => {
  try {
    const artists = await api.get("/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        time_range: "short_term",
        limit: limit || 5,
      },
    });
    const tracks = await api.get("/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        time_range: "short_term",
        limit: limit || 5,
      },
    });
    dispatch({
      type: "SET_USER_TOP_ITEMS",
      payload: { tracks: tracks.data.items, artists: artists.data.items },
    });
  } catch (error) {
    dispatch({
      type: "SET_USER_TOP_ITEMS",
      payload: null,
    });
  }
};

export default getUserTopItems;
