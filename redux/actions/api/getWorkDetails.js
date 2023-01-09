import api from "../../../utils/api";
import FastAverageColor from "fast-average-color";
const fac = new FastAverageColor();

const getWorkDetails = (token, type, id, country) => async (dispatch) => {
  try {
    const res = await api.get(`/${type}s/${id}`, {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        market: country || "EG",
      },
    });
    const colorInfo = await fac.getColorAsync(res.data.images[0].url, {
      ignoredColor: [
        [255, 255, 255, 255],
        [0, 0, 0, 255],
      ],
    });
    if (type !== "playlist") {
      const artist = type === "album" ? res.data.artists[0].id : res.data.id;
      const moreAlbums = await api.get(`/artists/${artist}/albums`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
        params: {
          limit: 5,
        },
      });
      const moreArtists = await api.get(`/artists/${artist}/related-artists`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
        params: {
          country: country || "EG",
        },
      });
      const moreTracks = await api.get(`/artists/${artist}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
        params: {
          country: country || "EG",
        },
      });
      dispatch({
        type: "GET_PLAYLIST|ARTIST|ALBUM__VIEW",
        payload: {
          ...res.data,
          bgColor: colorInfo.hex,
          moreAlbums: moreAlbums.data.items || [],
          moreArtists: moreArtists.data.artists || [],
          moreTracks: moreTracks.data.tracks || [],
        },
      });
    } else {
      dispatch({
        type: "GET_PLAYLIST|ARTIST|ALBUM__VIEW",
        payload: {
          ...res.data,
          bgColor: colorInfo.hex,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_PLAYLIST|ARTIST|ALBUM__VIEW",
      payload: null,
    });
  }
};

export default getWorkDetails;
