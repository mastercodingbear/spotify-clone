import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSearchResults, clearReducer } from "../../redux/actions";
import { useRouter } from "next/router";
import { container } from "../../components/AppMain/.module.sass";
import PlaylistsRow from "../../components/PlaylistsRow";
import TrackComponent from "../../components/TrackComponent";
import { playlists_row_title } from "../../components/PlaylistsRow/.module.sass";

const mapStateToProps = (state) => state;
const mapDispatchToProps = { getSearchResults, clearReducer };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function SearchQuery({
  token,
  countryCode,
  getSearchResults,
  searchResults,
  clearReducer,
}) {
  const router = useRouter();
  const QUERY = router.query.query;

  useEffect(() => {
    if (QUERY) getSearchResults(token, QUERY, countryCode);

    return () => {
      clearReducer();
    };
  }, [QUERY]);

  return (
    <div className="search_results_page_content_area my-5 pt-5">
      <div className={`${container} mt-3`}>
        <div className="tracks_row pb-5">
          <h4 className={`${playlists_row_title} pb-3`}>Songs</h4>
          {searchResults?.tracks?.items?.map((track, i) => (
            <TrackComponent
              key={i}
              track={{ ...track, index: i + 1 }}
              image
              uri={track.album.uri}
            />
          ))}
        </div>
        <PlaylistsRow
          content={{ msg: "playlists", items: searchResults?.playlists?.items }}
          placeholder={5}
        />
        <PlaylistsRow
          content={{ msg: "albums", items: searchResults?.albums?.items }}
          placeholder={5}
        />
        <PlaylistsRow
          content={{ msg: "artists", items: searchResults?.artists?.items }}
          placeholder={5}
        />
      </div>
    </div>
  );
});
