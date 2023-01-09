export default (payload) => {
  return {
    type: "CLEAR_REDUCER",
    payload: payload || null,
  };
};
