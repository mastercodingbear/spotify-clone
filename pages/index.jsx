import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import PlaylistsRow from "../components/PlaylistsRow";
import { container } from "../components/AppMain/.module.sass";
import {
  getFeaturedList,
  getRecentlyPlayedLists,
  getTopLikedArtists,
  getTopLikedTracks,
  getNewReleases,
  getBrowseCategories,
} from "../redux/actions";

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  getFeaturedList,
  getRecentlyPlayedLists,
  getTopLikedArtists,
  getTopLikedTracks,
  getNewReleases,
  getBrowseCategories,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Index({
  featuredPlaylists,
  recentlyPlaylists,
  getFeaturedList,
  getRecentlyPlayedLists,
  getTopLikedArtists,
  artistsPlaylists,
  token,
  getTopLikedTracks,
  albumsPlaylists,
  newReleasePlaylists,
  getNewReleases,
  countryCode,
  getBrowseCategories,
  browseCategories,
}) {
  useLayoutEffect(() => {
    if (!recentlyPlaylists?.items?.length) getRecentlyPlayedLists(token);
    if (!featuredPlaylists?.items?.length) getFeaturedList(token, countryCode);
    if (!artistsPlaylists?.items?.length) getTopLikedArtists(token);
    if (!albumsPlaylists?.items?.length) getTopLikedTracks(token);
    if (!newReleasePlaylists?.items?.length) getNewReleases(token, countryCode);
    if (!browseCategories.length) getBrowseCategories(token, countryCode, 5, 0);
  }, []);
  return (
    <div className="app_home_page_content_area my-5 pt-5">
      <div className={container}>
        <PlaylistsRow
          link={"/genre/recently_played"}
          content={recentlyPlaylists}
          placeholder={5}
        />
        <PlaylistsRow
          link={"/genre/featured_playlists"}
          content={featuredPlaylists}
          placeholder={5}
        />
        <PlaylistsRow
          link={"/genre/top_artists"}
          content={artistsPlaylists}
          placeholder={5}
        />
        <PlaylistsRow
          link={"/genre/top_albums"}
          content={albumsPlaylists}
          placeholder={5}
        />
        <PlaylistsRow
          link={"/genre/new_releases"}
          content={newReleasePlaylists}
          placeholder={5}
        />
        {browseCategories.map((category, i) => {
          return <PlaylistsRow key={i} content={category} placeholder={5} />;
        })}
      </div>
    </div>
  );
});
