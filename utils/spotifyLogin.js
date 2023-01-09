export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://lotus-spotify-clone.vercel.app";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const RESPONSE_TYPE = "code";
export const SCOPES =
  "user-read-recently-played,playlist-modify-private,user-modify-playback-state,user-read-playback-state,user-read-currently-playing,user-top-read,user-read-currently-playing,streaming,user-read-email,user-read-private";
export const SPOTIFY_LOGIN = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
