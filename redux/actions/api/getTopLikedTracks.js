import api from "../../../utils/api";

const getTopLikedTracks = (token, limit) => async (dispatch) => {
  try {
    const res = await api.get("/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        limit: limit || 5,
      },
    });
    const items = res.data.items.map((item) => item.album);
    if (items.length <= 5)
      dispatch({
        type: "GET_TOP_LIKED_TRACKS",
        payload: { msg: "more tracks you like", items },
      });
    else {
      dispatch({
        type: "GET_TOP_LIKED_TRACKS_ALL",
        payload: { msg: "more tracks you like", items },
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_TOP_LIKED_TRACKS",
      payload: { msg: "Something wrong happened!", items: [] },
    });
  }
};

export default getTopLikedTracks;
