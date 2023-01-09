import React, { useRef, useEffect, useState } from "react";
import styles from "./.module.sass";
import { BiTimeFive } from "react-icons/bi";
import { container } from "../AppMain/.module.sass";
import TrackComponent from "../TrackComponent";

export default function TracksTable({ tracks, type, link, image, uri }) {
  const tableHead = useRef();
  const [isTopFixed, setisTopFixed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRect.top === 75) setisTopFixed(true);
        else setisTopFixed(false);
      },
      {
        rootMargin: "-75px 0px 0px 0px",
        threshold: [1],
      }
    );
    observer.observe(tableHead.current);
  }, []);

  return (
    <div className={styles.tracks_table}>
      <div
        ref={tableHead}
        className={`${styles.tracks_table_head} ${
          isTopFixed ? styles.top_fixed : null
        }`}
      >
        <div className={container}>
          <div className={`px-md-4 row ${styles.head_details_row}`}>
            <div className="col-12 col-sm-10 col-md-6 col-lg-5">
              {tracks?.length ? (
                <span>
                  <span className="me-4">#</span>title
                </span>
              ) : (
                <>
                  <span
                    className={`${styles.icon_playlist_placeholder} me-4`}
                  ></span>
                  <span className={styles._playlist_placeholder}></span>
                </>
              )}
            </div>
            <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
              {tracks?.length && type === "playlist" ? (
                <span>album</span>
              ) : type === "playlist" ? (
                <span className={styles._playlist_placeholder}></span>
              ) : null}
            </div>
            <div className="col-12 col-lg-2  d-none d-lg-block">
              {tracks?.length && type === "playlist" ? (
                <span>data added</span>
              ) : type === "playlist" ? (
                <span className={styles._playlist_placeholder}></span>
              ) : null}
            </div>
            <div className="col-12  col-sm-2 col-lg-2 d-none d-sm-block text-end">
              <span className="text-end">
                {tracks?.length ? (
                  <BiTimeFive />
                ) : (
                  <span className={styles.icon_playlist_placeholder}></span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="playlist_tracks_container pt-4 pb-5">
        <div className={container}>
          {tracks?.length
            ? tracks?.map((track, i) => (
                <TrackComponent
                  link={link}
                  key={i}
                  track={{ ...track, index: i + 1 }}
                  type={type}
                  image={image}
                  uri={uri}
                />
              ))
            : [...Array(15)].map((_, i) => (
                <TrackComponent image={image} link={link} key={i} type={type} />
              ))}
        </div>
      </div>
    </div>
  );
}
