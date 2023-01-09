import api from "../../../utils/api";

const getCategoryPlaylists =
  (id, token, country, limit) => async (dispatch) => {
    try {
      const res = await api.get(`/browse/categories/${id}/playlists`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
        params: {
          country: country || "EG",
          limit: limit || 5,
        },
      });
      dispatch({
        type: "GET_CATEGORY_ALL_PLAYLISTS",
        payload: {
          msg: id,
          items: res.data.playlists.items,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_CATEGORY_ALL_PLAYLISTS",
        payload: { msg: null, items: null },
      });
    }
  };

export default getCategoryPlaylists;
