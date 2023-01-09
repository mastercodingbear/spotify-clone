import api from "../../../utils/api";
import FastAverageColor from "fast-average-color";
const fac = new FastAverageColor();
import rac from "randomcolor";

const getGenres = (token, country, limit, offset) => async (dispatch) => {
  try {
    const categories = await api.get("/browse/categories", {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        country: country || "EG",
        limit: limit || 5,
        offset: offset || 0,
      },
    });
    const ids = categories.data.categories.items.map((item) => item.id);
    ids.map(async (id, i) => {
      try {
        const res = await api.get(`/browse/categories/${id}/playlists`, {
          headers: {
            Authorization: `Bearer ${
              token || window.localStorage.getItem("token")
            }`,
          },
          params: {
            country: country || "EG",
            limit: 1,
          },
        });

        if (res.data.playlists.items.length) {
          const colorInfo = await fac.getColorAsync(
            res.data.playlists.items[0].images[0].url,
            {
              ignoredColor: [
                [255, 255, 255, 255],
                [0, 0, 0, 255],
              ],
            }
          );
          dispatch({
            type: "GET__GENRES",
            payload: {
              id: ids[i],
              name: categories.data.categories.items[i].name,
              cover: res.data.playlists.items[0].images[0].url,
              bgColor: colorInfo.hex || rac(),
            },
          });
        }
      } catch (error) {
        dispatch({
          type: "GET__GENRES",
          payload: { name: null, id: null, cover: null },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: "GET__GENRES",
      payload: { name: null, id: null, cover: null },
    });
  }
};

export default getGenres;
