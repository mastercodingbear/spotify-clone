import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import styles from "./.module.sass";
import AppSidebar from "../AppSidebar";
import SignupBanner from "../SignupBanner";
import ActionsTopBar from "../ActionsTopBar";
import { useRouter } from "next/router";
import { FiChevronUp } from "react-icons/fi";
import { getBrowseCategories } from "../../redux/actions";
import { connect } from "react-redux";
import AudioPlayer from "../AudioPlayer";
import { setSpotifyPlayer, getPlayerState } from "../../redux/actions";

export default connect((state) => state, {
  getBrowseCategories,
  setSpotifyPlayer,
  getPlayerState,
})(function AppMain({
  user,
  token,
  countryCode,
  children,
  getBrowseCategories,
}) {
  //************************************************************//
  const [scrollBtn, setscrollBtn] = useState(false);
  const [isSticky, setisSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const container = useRef(null);
  const [categoriesPerRender, _] = useState(1);
  const [offset, setOffset] = useState(5);

  useEffect(() => {
    container.current.scrollTop = 0;
  }, [router]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined")
      if (window.innerWidth < 991) setOpen(false);
      else
        setOpen(
          JSON.parse(window.localStorage.getItem("isAsideOpen")) || false
        );
  }, []);

  if (typeof window !== "undefined") {
    window.onresize = () => {
      if (window.innerWidth < 991) {
        if (open) setOpen(false);
      } else {
        if (!open) setOpen(true);
      }
    };
    if (container.current)
      container.current.onscroll = () => {
        if (router.pathname === "/") {
          if (
            container?.current?.scrollHeight -
              container?.current?.offsetHeight ===
            container?.current?.scrollTop
          ) {
            if (categoriesPerRender * (offset + 1) <= 40) loadMoreCategories();
          }
        }
        if (container?.current?.scrollTop >= 200) {
          setisSticky(true);
          setscrollBtn(true);
        }
        if (container?.current?.scrollTop < 100) {
          setscrollBtn(false);
          setisSticky(false);
        }
      };
  }

  const loadMoreCategories = () => {
    setOffset(offset + 1);
    getBrowseCategories(
      token,
      countryCode,
      categoriesPerRender,
      categoriesPerRender * (offset + 1)
    );
  };

  return (
    <main
      className={`${styles.app_main_area} ${open ? styles.aside_open : ""}`}
    >
      <div className={styles.app_main_top_section}>
        <AppSidebar
          open={open}
          setOpen={setOpen}
          style={styles.app_main_sidebar}
        />
        <div ref={container} className={`${styles.app_main_func_container}`}>
          <ActionsTopBar isSticky={isSticky} />
          <div className={styles.container}>
            <>
              {scrollBtn ? (
                <button
                  title="Scroll To The Top"
                  className={styles.scroll_top_btn}
                  onClick={() => (container.current.scrollTop = 0)}
                >
                  <FiChevronUp />
                </button>
              ) : null}
            </>
          </div>
          {children}
          {router.pathname === "/" &&
          categoriesPerRender * (offset + 1) <= 41 ? (
            <div className={styles.container}>
              <div className={styles.loading_more_spinner}>
                <div
                  className={`spinner-grow ${styles.grow_spinner}`}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <footer className={styles.app_main_bottom_section}>
        {user?.product !== "premium" ? <SignupBanner /> : <AudioPlayer />}
      </footer>
    </main>
  );
});
