export default (results = {}, action) => {
  if (action.type === "SET_SEARCH_RESULTS") {
    return action.payload;
  }
  if (action.type === "CLEAR_REDUCER") {
    return action.payload;
  }
  return results;
};
