import api from "../../../utils/api";

const getSearchResults = (token, q, cc) => async (dispatch) => {
  try {
    const res = await api.get("/search", {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        q,
        type: "track,artist,album,playlist",
        market: cc,
        limit: 5,
      },
    });
    dispatch({ type: "SET_SEARCH_RESULTS", payload: res.data });
  } catch (error) {
    dispatch({ type: "SET_SEARCH_RESULTS", payload: null });
  }
};

export default getSearchResults;
