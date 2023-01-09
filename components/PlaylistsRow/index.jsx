import React from "react";
import styles from "./.module.sass";
import Link from "next/link";
import PlayListComponent from "../PlayListComponent";

export default function PlaylistsRow({ content, link, placeholder }) {
  return (
    <section className={styles.playlists_row}>
      <div className="d-flex playlists_row_header align-items-center justify-content-between">
        {content && content.msg ? (
          <h4 className={styles.playlists_row_title}>{content.msg}</h4>
        ) : (
          <span className={styles.placeholder}></span>
        )}
        {content?.items?.length && link ? (
          <Link href={link}>
            <a title="Browse More Results" className={styles.see_all_link}>
              see all
            </a>
          </Link>
        ) : null}
      </div>
      <div className="playlists_container row">
        {content?.items?.length
          ? content?.items?.map((item, i) => (
              <PlayListComponent playlist={item} key={i} />
            ))
          : [...Array(placeholder)]?.map((el, i) => (
              <PlayListComponent key={i} />
            ))}
      </div>
    </section>
  );
}
