import api from "../../../utils/api";

const getPlayerState = (token) => async (dispatch) => {
  try {
    const res = await api.get("/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch({
      type: "GET_CURRENT_PLAY_STATE",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_CURRENT_PLAY_STATE",
      payload: false,
    });
  }
};

export default getPlayerState;
