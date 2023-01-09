import api from "../../../utils/api";

const playPauseTrack =
  (deviceID, token, spotify_uri, offset) => async (dispatch) => {
    await api.put(
      `/me/player`,
      { device_ids: [deviceID], play: false },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (spotify_uri)
      if (offset) {
        await api.put(
          `/me/player/play?device_id=${deviceID}`,
          {
            context_uri: spotify_uri,
            offset: {
              position: offset,
            },
            position_ms: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await api.put(
          `/me/player/play?device_id=${deviceID}`,
          {
            context_uri: spotify_uri,
            position_ms: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    dispatch({ type: "", action: {} });
  };

export default playPauseTrack;
