export default (list = [], action) => {
  if (action.type === "GET__GENRES") {
    return [...list, action.payload];
  }
  return list;
};
