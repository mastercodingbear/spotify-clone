import React from "react";
import styles from "./.module.sass";
import Link from "next/link";
import AppLogo from "../../public/assets/icons/logo";
import { useRouter } from "next/router";
import { SPOTIFY_LOGIN } from "../../utils/spotifyLogin";
import { useTheme } from "next-themes";
import AppModeIcon from "../../public/assets/icons/appModeIcon";
import { BsSpotify } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiFillSkype,
  AiOutlineGlobal,
} from "react-icons/ai";

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme("");

  return (
    <div className={styles.app_landing_wrapper}>
      <div className="container pt-5 pb-3  px-3 px-lg-5">
        <div className="row px-3 px-lg-5 align-items-center">
          <div className="col-8">
            <Link href="/">
              <a title="Spotify" className={styles.logo_app_link}>
                <AppLogo width={140} height={43} />
              </a>
            </Link>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end justify-content-xl-between">
            <nav className="w-100 d-none d-xl-flex">
              <ul className={styles.nav_list}>
                <li>
                  <a
                    target={"_blank"}
                    rel="noreferrer noopener"
                    href="https://www.spotify.com/premium"
                  >
                    premium
                  </a>
                </li>
                <li>
                  <a
                    target={"_blank"}
                    rel="noreferrer noopener"
                    href="https://support.spotify.com"
                  >
                    support
                  </a>
                </li>
                <li>
                  <a
                    target={"_blank"}
                    rel="noreferrer noopener"
                    href="https://www.spotify.com/download"
                  >
                    download
                  </a>
                </li>
              </ul>
            </nav>
            <button
              title="Change Theme Mode"
              className={styles.app_mode_toggle_btn}
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              <AppModeIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.hero_wrapper}>
        <div className="container  px-3 px-lg-5">
          <div className="row px-3 px-lg-5 align-items-center d-flex">
            <div className="col-12 d-flex-column col-lg-5">
              <h1 className={styles.hero_head}>
                Music you love, right at your fingertrips.
              </h1>
              <p className={`my-4 py-2`}>
                Ad-free, offline listening and more for $9.99/month, Cancel
                anytime
              </p>
              <button
                title="Login Into Spotify"
                onClick={() => {
                  router.push(SPOTIFY_LOGIN);
                }}
                className={styles.login_cta_btn_styled}
              >
                Login into spotify & enjoy
              </button>
              <div className={styles.connect_me}>
                <p>
                  App still in development mode. users are limited. contact me
                  with your spotify email and user to add you
                </p>
                <ul>
                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer noopener"
                      href="https://join.skype.com/invite/JmNrWxIrLmAO"
                    >
                      <AiFillSkype />
                    </a>
                  </li>

                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer noopener"
                      href="https://github.com/mastercodingbear"
                    >
                      <AiFillGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`d-none d-xl-flex col-7 ${styles.spotify_icon}`}>
              <BsSpotify />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
