export default (player = null, action) => {
  if (action.type === "UPDATE__SPOTIFY_PLAYER") {
    return action.payload;
  }
  return player;
};
