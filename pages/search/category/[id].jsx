import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getCategoryPlaylists, clearReducer } from "../../../redux/actions";
import { container } from "../../../components/AppMain/.module.sass";
import PlaylistsRow from "../../../components/PlaylistsRow";
import styles from "./.module.sass";
import Error from "next/error";

const mapStateToProps = (state) => state;
const mapDispatchToProps = { getCategoryPlaylists, clearReducer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function SearchCategoryPage({
  countryCode,
  categoryPage,
  token,
  getCategoryPlaylists,
  clearReducer,
}) {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!categoryPage?.items?.length)
      getCategoryPlaylists(id, token, countryCode, 25);

    return () => {
      clearReducer({});
    };
  }, [router]);

  if (categoryPage?.items === null && categoryPage?.msg === null)
    return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>Spotify | {id || "Loading"}</title>
      </Head>
      <section className="category_page_content_area">
        <div className={styles.page_header}>
          <div className={container}>
            <h1>{id}</h1>
          </div>
        </div>

        <div className="mb-5">
          <div className={container}>
            <PlaylistsRow
              content={{ ...categoryPage, msg: " " }}
              placeholder={25}
            />
          </div>
        </div>
      </section>
    </>
  );
});
