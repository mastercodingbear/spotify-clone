import api from "../../../utils/api";

const getTopLikedArtists = (token, limit) => async (dispatch) => {
  try {
    const res = await api.get("/me/top/artists", {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        limit: limit || 5,
      },
    });
    if (res.data.items.length <= 5)
      dispatch({
        type: "GET_TOP_LIKED_ARTISTS",
        payload: { msg: "artists you like", items: res.data.items },
      });
    else {
      dispatch({
        type: "GET_TOP_LIKED_ARTISTS_ALL",
        payload: { msg: "artists you like", items: res.data.items },
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_TOP_LIKED_ARTISTS",
      payload: { msg: "Something wrong happened!", items: [] },
    });
  }
};

export default getTopLikedArtists;
