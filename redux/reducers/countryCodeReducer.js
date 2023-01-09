export default (code = null, action) => {
  if (action.type === "SET_USER_COUNTRY_CODE") {
    return action.payload;
  }
  return code;
};
