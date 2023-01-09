import api from "../../../utils/api";

const getNewReleases = (token, country, limit) => async (dispatch) => {
  try {
    const res_1 = await api.get("/browse/new-releases", {
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
    const ids = [...new Set(res_1.data.albums.items.map((item) => item.id))];
    ids.map(async (id) => {
      const res = await api.get(`/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
      });
      if (res_1.data.albums.items.length <= 5)
        dispatch({
          type: "GET_NEW_RELEASES_PLAYLISTS",
          payload: { msg: "new released", item: res.data },
        });
      else {
        dispatch({
          type: "GET_NEW_RELEASES_PLAYLISTS_ALL",
          payload: { msg: "new released", item: res.data },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: "GET_NEW_RELEASES_PLAYLISTS",
      payload: { msg: "Something wrong happened!", items: [] },
    });
  }
};

export default getNewReleases;
