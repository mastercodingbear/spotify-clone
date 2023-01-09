import api from "../../../utils/api";

const getMe = (token) => async (dispatch) => {
  try {
    const res = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "UPDATE_USER_STATE",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_STATE",
      payload: false,
    });
    window.localStorage.setItem("token", null);
  }
};

export default getMe;
