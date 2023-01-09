import api from "../../../utils/api";

const getRecentlyPlayedLists = (token, limit) => async (dispatch) => {
  try {
    const recentTracks = await api.get("/me/player/recently-played", {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        limit: limit || 5,
      },
    });
    const ids = [
      ...new Set(
        recentTracks.data.items.map((item) => item.context.uri.split(":")[2])
      ),
    ];

    ids.map(async (id) => {
      const res = await api.get(`/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
      });
      if (recentTracks.data.items.length <= 5)
        dispatch({
          type: "GET_RECENTLY_PLAYED_PLAYLISTS",
          payload: { msg: "recently played", item: res.data },
        });
      else {
        dispatch({
          type: "GET_GENRE_RECENT_PLAYLISTS_ALL",
          payload: { msg: "recently played", item: res.data },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: "GET_RECENTLY_PLAYED_PLAYLISTS",
      payload: { msg: "Something wrong happened!", items: [] },
    });
  }
};

export default getRecentlyPlayedLists;
