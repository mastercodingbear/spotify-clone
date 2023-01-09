import React, { useState, useEffect } from "react";
import styles from "./.module.sass";
import Link from "next/link";
import NextImage from "../NextImage";
import PlayPauseBtn from "../PlayPauseBtn";
import { connect } from "react-redux";

export default connect(
  (state) => state,
  {}
)(function PlayListComponent({ playlist, spotifyPlayer }) {
  const [isPlaying, setisPlaying] = useState(false);

  useEffect(() => {
    if (spotifyPlayer) {
      if (
        spotifyPlayer?.context?.uri === playlist?.uri &&
        !spotifyPlayer?.paused
      ) {
        setisPlaying(true);
      } else {
        setisPlaying(false);
      }
    }
  }, [spotifyPlayer, playlist]);

  return (
    <div className={`col-12 col-sm-6 col-md-4 col-xl-3  ${styles.col_xxl_2_5}`}>
      <div className={styles.playlist_component_styled}>
        <div
          className={`${styles.playlist_cover_wrapper} ${
            playlist?.type === "artist" ? styles.circled : null
          }`}
        >
          <Link href={`/${playlist?.type}/${playlist?.id}`}>
            <a className={styles.playlist_cover_link}>
              {playlist ? (
                <NextImage
                  quality={100}
                  path={playlist?.images[0]?.url}
                  layout="responsive"
                  alt={`${playlist?.name}_cover`}
                  width={100}
                  height={100}
                  priority
                  objectFit="cover"
                />
              ) : null}
            </a>
          </Link>
          {playlist ? (
            <div
              className={`${styles.playlist_play_pause_btn_container} ${
                isPlaying ? styles.isPlaying : null
              }`}
            >
              <PlayPauseBtn
                uri={playlist?.uri}
                size={40}
                isPlaying={isPlaying}
                setisPlaying={setisPlaying}
              />
            </div>
          ) : null}
        </div>
        {playlist ? (
          <Link href={`/${playlist?.type}/${playlist?.id}`}>
            <a>
              <h6 className={styles.playlist_title}>{playlist.name}</h6>
              <p
                className={styles.playlist_overview}
                dangerouslySetInnerHTML={{
                  __html:
                    playlist?.type === "artist"
                      ? "Artist"
                      : playlist.description ||
                        new Date(playlist.release_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            year: "numeric",
                            month: "long",
                          }
                        ),
                }}
              />
            </a>
          </Link>
        ) : (
          <>
            <span className={`mb-3 ${styles.skelton_placeholder}`}></span>
            <span className={`w-100 my-2 ${styles.skelton_placeholder}`}></span>
            <span className={`w-100 my-1 ${styles.skelton_placeholder}`}></span>
          </>
        )}
      </div>
    </div>
  );
});
