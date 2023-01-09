import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import PlaylistsRow from "../../components/PlaylistsRow";
import Head from "next/head";
import capitalize from "../../utils/capitalize";
import { container } from "../../components/AppMain/.module.sass";
import {
  getRecentlyPlayedLists,
  getFeaturedList,
  getTopLikedArtists,
  getTopLikedTracks,
  getNewReleases,
  clearReducer,
} from "../../redux/actions";

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  getRecentlyPlayedLists,
  clearReducer,
  getFeaturedList,
  getNewReleases,
  getTopLikedArtists,
  getTopLikedTracks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function GenrePage({
  genrePlaylists,
  getNewReleases,
  countryCode,
  getRecentlyPlayedLists,
  getFeaturedList,
  token,
  clearReducer,
  getTopLikedArtists,
  getTopLikedTracks,
}) {
  const router = useRouter();

  useEffect(() => {
    if (!genrePlaylists?.items?.length)
      switch (router.query.genre) {
        case "recently_played":
          getRecentlyPlayedLists(token, 30);
          break;
        case "featured_playlists":
          getFeaturedList(token, countryCode, 30);
          break;
        case "top_artists":
          getTopLikedArtists(token, 30);
          break;
        case "top_albums":
          getTopLikedTracks(token, 30);
          break;
        case "new_releases":
          getNewReleases(token, countryCode, 30);
          break;
        default:
          break;
      }
    return () => {
      clearReducer({ msg: null, items: [] });
    };
  }, []);
  return (
    <>
      <Head>
        <title>{`Spotify App | ${
          genrePlaylists?.msg ? capitalize(genrePlaylists?.msg) : "Loading"
        }`}</title>
      </Head>
      <div className="genre_page_content_area pt-5 my-5">
        <div className={container}>
          <PlaylistsRow content={genrePlaylists} placeholder={20} />
        </div>
      </div>
    </>
  );
});

export async function getStaticProps(context) {
  return {
    props: {},
    notFound: ![
      "recently_played",
      "featured_playlists",
      "top_albums",
      "top_artists",
      "new_releases",
    ].includes(context?.params?.genre),
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { genre: "recently_played" } },
      { params: { genre: "featured_playlists" } },
      { params: { genre: "top_albums" } },
      { params: { genre: "top_artists" } },
      { params: { genre: "new_releases" } },
    ],
    fallback: false,
  };
}
