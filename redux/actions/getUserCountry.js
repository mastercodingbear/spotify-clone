import axios from "axios";

const getUserCountry = () => async (dispatch) => {
  try {
    const res = await axios.get("https://ipinfo.io?token=1f57143c96e23b");
    dispatch({
      type: "SET_USER_COUNTRY_CODE",
      payload: res.country,
    });
  } catch (error) {
    dispatch({
      type: "SET_USER_COUNTRY_CODE",
      payload: "EG",
    });
  }
};

export default getUserCountry;
