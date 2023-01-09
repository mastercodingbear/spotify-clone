import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { container } from "../../components/AppMain/.module.sass";
import { getUserTopItems } from "../../redux/actions";
import TrackComponent from "../../components/TrackComponent";
import PlaylistsRow from "../../components/PlaylistsRow";
import styles from "./.module.sass";
import NextImage from "../../components/NextImage";
import FastAverageColor from "fast-average-color";
const fac = new FastAverageColor();

const mapStateToProps = (state) => state;
const mapDispatchToProps = { getUserTopItems };

export const UserProfile = ({ user, token, getUserTopItems, userTopItems }) => {
  const [colorInfo, setcolorInfo] = useState();
  useEffect(() => {
    if (user?.images[0]?.url) {
      fac
        .getColorAsync(user?.images[0]?.url, {
          ignoredColor: [
            [255, 255, 255, 255],
            [0, 0, 0, 255],
          ],
        })
        .then((res) => {
          setcolorInfo(res);
        });
    }
  }, [user]);

  useEffect(() => {
    !userTopItems?.tracks?.length || !userTopItems?.artists?.length
      ? getUserTopItems(token, 10)
      : null;
  }, []);

  return (
    <section
      style={{
        background: `linear-gradient( to bottom, ${colorInfo?.hex} 20%, transparent 100%)`,
      }}
      className={`${styles.profile_page_header} pt-5`}
    >
      <div className={container}>
        <div
          className={`row align-items-center ${styles.user_info_wrapper}  mt-5 pt-2`}
        >
          <div
            className={`col-12 col-md-6 col-lg-5 col-xl-4 ${styles.col_xxl_3}`}
          >
            <div className={`${styles.user_cover_container}`}>
              {user?.images?.length ? (
                <NextImage
                  layout="responsive"
                  height={100}
                  width={100}
                  alt={user?.display_name}
                  title={user?.display_name}
                  path={user?.images[0]?.url}
                  quality={100}
                  objectFit="cover"
                ></NextImage>
              ) : null}
            </div>
          </div>
          <div
            className={`mt-4 mt-md-0 col-12 col-md-6 col-lg-7 col-xl-8 ${styles.col_xxl_9}`}
          >
            <div className={styles.user_details_container}>
              <span>PROFILE</span>
              {user?.display_name ? (
                <h1>{user?.display_name}</h1>
              ) : (
                <span className={styles.name_placeholder}></span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="user_profile_page_content_area my-5 pt-5">
        <div className="tracks_row">
          <div className={container}>
            <h2 className={styles.row_title}>Top artists this month</h2>
            <span className={styles.row_span}>Only visible to you</span>
            <PlaylistsRow
              content={{
                msg: " ",
                items: userTopItems?.artists,
              }}
              placeholder={5}
            />
          </div>
        </div>
        <div className="tracks_row py-5">
          <div className={container}>
            <h2 className={styles.row_title}>Top tracks this month</h2>
            <span className={styles.row_span}>Only visible to you</span>
            {userTopItems?.tracks?.map((track, i) => (
              <TrackComponent
                key={i}
                link
                track={{ ...track, index: i + 1 }}
                image
                uri={track?.album.uri}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
