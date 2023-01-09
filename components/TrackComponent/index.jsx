import React, { useState, useEffect } from "react";
import styles from "./.module.sass";
import Link from "next/link";
import moment from "moment";
import NextImage from "../NextImage";
import { connect } from "react-redux";
import PlayPauseBtn from "../PlayPauseBtn";

export default connect((state) => state)(function TrackComponent({
  spotifyPlayer,
  track,
  type,
  link,
  image,
  uri,
}) {
  const [isPlaying, setisPlaying] = useState(false);

  useEffect(() => {
    if (spotifyPlayer) {
      if (
        (spotifyPlayer?.track_window?.current_track?.uri ===
          track?.track?.uri ||
          spotifyPlayer?.track_window?.current_track?.uri === track?.uri) &&
        !spotifyPlayer?.paused
      ) {
        setisPlaying(true);
      } else {
        setisPlaying(false);
      }
    }
  }, [spotifyPlayer, track]);

  return (
    <div
      className={`${styles.track_component_row} ${
        isPlaying ? styles.is_playing : null
      }`}
    >
      <div className="row align-items-center py-2 my-2 px-md-4">
        <div className="col-12 col-sm-10 col-md-6 col-lg-5 d-flex align-items-center">
          <span className={`${styles.track_index}`}>
            {track ? (
              <>
                <span className={styles.track_index_num}>
                  {track?.index < 10 ? `0${track?.index}` : track?.index}
                </span>
                <span className={styles.play_pause_btn}>
                  <PlayPauseBtn
                    isPlaying={isPlaying}
                    uri={type === "artist" ? uri[track?.index - 1] : uri}
                    offset={type !== "artist" ? track?.index : null}
                    size={20}
                  />
                </span>
              </>
            ) : (
              <span className={styles.icon_playlist_placeholder}></span>
            )}
          </span>
          <span className={`${styles.track_title} px-2`}>
            {image ? (
              <div className={`${styles.track_cover_wrapper} me-3`}>
                {track?.track?.album?.images || track?.album?.images ? (
                  <NextImage
                    path={
                      track?.album?.images
                        ?.slice(0)
                        .reverse()
                        .find((el) => el.url).url ||
                      track?.track?.album?.images
                        ?.slice(0)
                        .reverse()
                        .find((el) => el.url).url
                    }
                    layout="fixed"
                    width={40}
                    height={40}
                    priority
                    alt={track?.track?.name || track?.name}
                  />
                ) : null}
              </div>
            ) : null}
            <div className={`${styles.track_name_artist}`}>
              <span className={styles.track_name}>
                {track ? (
                  track?.track?.name || track?.name
                ) : (
                  <span className={styles._playlist_placeholder}></span>
                )}
              </span>
              {track ? (
                <span>
                  {link
                    ? track?.track?.album?.artists?.map((artist, i) => (
                        <Link key={i} href={`/artist/${artist?.id}`}>
                          <a className={styles.track_artist_link}>
                            {artist?.name}
                          </a>
                        </Link>
                      ))
                    : null}
                  {link
                    ? track?.artists?.map((artist, i) => (
                        <Link key={i} href={`/artist/${artist?.id}`}>
                          <a className={styles.track_artist_link}>
                            {artist?.name}
                          </a>
                        </Link>
                      ))
                    : null}
                </span>
              ) : (
                <span className={`${styles._playlist_placeholder} w-50`}></span>
              )}
            </div>
          </span>
        </div>
        <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
          <Link href={`/album/${track?.track?.album?.id}`}>
            <a className={styles.track_album_link}>
              {track ? (
                track?.track?.album?.name
              ) : type === "playlist" ? (
                <span className={styles._playlist_placeholder}></span>
              ) : null}
            </a>
          </Link>
        </div>
        <div className="col-12 col-lg-2 d-none d-lg-block">
          <span className={styles.track_added_at_date}>
            {track?.track ? (
              moment(track?.added_at).fromNow()
            ) : type === "playlist" ? (
              <span className={styles._playlist_placeholder}></span>
            ) : null}
          </span>
        </div>
        <div className="col-12 col-sm-2 col-lg-2 d-none d-sm-block text-end">
          <span className="text-end">
            {track ? (
              <>
                {/* <span className="like_track_btn me-3">J</span> */}
                <span className="track_time_length">
                  {!track?.track
                    ? moment(track?.duration_ms).format("m:ss")
                    : moment(track?.track?.duration_ms).format("m:ss")}
                </span>
              </>
            ) : (
              <span>
                <span
                  className={`${styles.icon_playlist_placeholder} me-3`}
                ></span>
                <span className={`${styles._playlist_placeholder} w-50`}></span>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
});
