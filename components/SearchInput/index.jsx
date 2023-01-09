import React from "react";
import styles from "./.module.sass";
import SearchIcon from "../../public/assets/icons/searchIcon";
import { useRouter } from "next/router";
import debounce from "debounce";

export default function SearchInput() {
  const router = useRouter();
  if (router.pathname.startsWith("/search"))
    return (
      <div className={styles.search_form_container}>
        <SearchIcon />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Artists, songs or podcasts"
            onChange={debounce((e) => {
              router.push(`/search/${e.target.value}`);
            }, 1000)}
          />
        </form>
      </div>
    );
  return <></>;
}
