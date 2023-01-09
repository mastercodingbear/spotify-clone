import React from "react";
import styles from "./.module.sass";

export default function SignupBanner() {
  return (
    <div className={`${styles.sign_up_banner} justify-content-lg-between`}>
      <div className="d-none d-lg-block">
        <span className={styles.overview_spotify}>Important Note</span>
        <p className={`m-0 mt-1 ${styles.banner_content}`}>
          Spotify SDK that used in this app to play music tracks is only
          available for premium accounts.
        </p>
      </div>
      <a
        rel="noreferrer noopener"
        href={"https://www.spotify.com/premium"}
        target={"_blank"}
        className={styles.banner_signup_cta}
      >
        subscribe now
      </a>
    </div>
  );
}
