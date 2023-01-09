import React, { useLayoutEffect, useState, useEffect } from "react";
import Head from "next/head";
import styles from "./.module.sass";
import NextImage from "../../../components/NextImage";
import { container } from "../../../components/AppMain/.module.sass";
import { connect } from "react-redux";
import { getWorkDetails, clearReducer } from "../../../redux/actions";
import { useRouter } from "next/router";
import VerifiedIcon from "../../../public/assets/icons/verified";
import Link from "next/link";
import Error from "next/error";
import numerize from "../../../utils/numerize";
import PlayPauseBtn from "../../../components/PlayPauseBtn";
import TracksTable from "../../../components/TracksTable";
import PlaylistRow from "../../../components/PlaylistsRow";

const mapStateToProps = (state) => state;
const mapDispatchToProps = { getWorkDetails, clearReducer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function WorkDetailsPage({
  token,
  countryCode,
  workView,
  getWorkDetails,
  clearReducer,
  spotifyPlayer,
}) {
  const router = useRouter();
  const { work, id } = router.query;
  const [isFound, setisFound] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);

  useEffect(() => {
    if (spotifyPlayer) {
      if (
        spotifyPlayer?.context?.uri === workView?.uri &&
        !spotifyPlayer?.paused
      ) {
        setisPlaying(true);
      } else {
        setisPlaying(false);
      }
    }
  }, [spotifyPlayer, workView]);

  useLayoutEffect(() => {
    if (["playlist", "artist", "album"].includes(work) && id) {
      setisFound(true);
      getWorkDetails(token, work, id, countryCode);
    }
    return () => {
      clearReducer({});
    };
  }, [id]);

  if (!isFound && !workView) return <Error statusCode={404} />;
  return (
    <>
      <Head>
        <title>Spotify App | {workView?.name || "Loading"}</title>
      </Head>
      <div
        className={`${styles.work_page_content_wrapper} pt-5`}
        style={
          workView?.bgColor
            ? {
                background: `linear-gradient( to bottom, ${workView?.bgColor} 20%, transparent 100%)`,
              }
            : null
        }
      >
        <div className={`${container}`}>
          <div
            className={`row ${
              work === "artist" ? "align-items-center" : null
            } ${styles.work_info_wrapper} mt-5 pt-2`}
          >
            <div
              className={`col-12 col-md-6 col-lg-5 col-xl-4 ${styles.col_xxl_3}`}
            >
              <div
                className={`${styles.work_cover_container} ${
                  work === "artist" ? styles.circled : null
                }`}
              >
                {workView?.images?.length ? (
                  <NextImage
                    layout="responsive"
                    height={100}
                    width={100}
                    alt={workView?.name}
                    title={workView?.name}
                    path={workView?.images[0]?.url}
                  ></NextImage>
                ) : null}
              </div>
            </div>
            <div
              className={`mt-4 mt-md-0 col-12 col-md-6 col-lg-7 col-xl-8 ${styles.col_xxl_9}`}
            >
              <div className={styles.work_details_container}>
                {workView?.type ? (
                  <span className={styles.work_type}>
                    {workView?.type === "artist" ? (
                      <>
                        <VerifiedIcon /> Verified Artist
                      </>
                    ) : (
                      workView?.type
                    )}
                  </span>
                ) : (
                  <span className={styles.type_placeholder}></span>
                )}

                {workView?.name ? (
                  <h1>{workView?.name}</h1>
                ) : (
                  <span className={styles.name_placeholder}></span>
                )}

                {workView?.album_type ||
                workView?.description ||
                workView?.genres?.length ? (
                  <>
                    <p
                      className={styles.work_description}
                      dangerouslySetInnerHTML={{
                        __html:
                          workView?.description || workView?.genres?.join(", "),
                      }}
                    ></p>
                    <p className={styles.work_fact}>
                      {workView?.type === "playlist" ||
                      workView?.type === "album" ? (
                        workView?.type === "album" ? (
                          <>
                            <Link href={`/artist/${workView?.artists[0]?.id}`}>
                              <a>{workView?.artists[0]?.name} </a>
                            </Link>
                            <span>{`. ${
                              workView?.release_date?.split("-")[0]
                            } . ${workView?.tracks?.items?.length} Tracks . ${
                              workView?.album_type
                            }`}</span>
                          </>
                        ) : (
                          <>
                            <span>{workView?.owner?.display_name} </span>
                            <span>{`. ${numerize(
                              workView?.followers?.total
                            )} Followers . ${
                              workView?.tracks?.items?.length
                            } Tracks`}</span>
                          </>
                        )
                      ) : (
                        <span>
                          {numerize(workView?.followers?.total)} Followers
                        </span>
                      )}
                    </p>
                  </>
                ) : workView?.type !== "artist" ? (
                  <>
                    <>
                      <span className={styles.more_placeholder}></span>
                      <span className={styles.more_placeholder}></span>
                      <span className={styles.more_placeholder}></span>
                    </>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.work_actions_wrapper}>
            <span className="PP_btn_wrapper pt-5 pb-4">
              <PlayPauseBtn
                uri={workView?.uri}
                size={50}
                isPlaying={isPlaying}
                setisPlaying={setisPlaying}
              />
            </span>
          </div>
        </div>
        {work === "playlist" || work === "album" ? (
          <TracksTable
            image={work === "playlist"}
            link
            tracks={workView?.tracks?.items}
            type={work}
            uri={workView?.uri}
          />
        ) : null}
        {workView?.artists?.length && work === "album" ? (
          <div className="more_tracks_by_artist pb-5">
            <div className={container}>
              <PlaylistRow
                placeholder={5}
                content={{
                  msg: `More by ${workView?.artists[0]?.name}`,
                  items: workView?.moreAlbums,
                }}
              />
            </div>
          </div>
        ) : null}
        {work === "artist" ? (
          <>
            <TracksTable
              image={true}
              link={false}
              tracks={workView?.moreTracks}
              type={work}
              uri={workView?.moreTracks?.map((track) => {
                return track.album.uri;
              })}
            />
            <div className="more_tracks_by_artist pb-5">
              <div className={container}>
                <PlaylistRow
                  placeholder={5}
                  content={{
                    msg: `Popular releases`,
                    items: workView?.moreAlbums,
                  }}
                />
                <PlaylistRow
                  placeholder={5}
                  content={{
                    msg: `Fans also like`,
                    items: workView?.moreArtists,
                  }}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
});
export async function getStaticProps(context) {
  return {
    props: {},
    notFound:
      !["playlist", "artist", "album"].includes(context.params.work) ||
      !context.params.id,
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
