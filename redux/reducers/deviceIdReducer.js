export default (id = null, action) => {
  if (action.type === "SET_DEVICE_ID") {
    return action.payload;
  }
  return id;
};
