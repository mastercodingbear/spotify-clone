import React from "react";
import SearchIcon from "../../public/assets/icons/searchIcon";
import HomeIcon from "../../public/assets/icons/homeIcon";
import LibIcon from "../../public/assets/icons/LibIcon";
// import HeartIcon from "../../public/assets/icons/HeartIcon";
import PlusIcon from "../../public/assets/icons/plusIcon";
import AppModeIcon from "../../public/assets/icons/appModeIcon";
import styles from "./.module.sass";
import NavLink from "../NavLink";
import { useTheme } from "next-themes";
import capitalize from "../../utils/capitalize";

export default function AsideNavList({ open }) {
  const { theme, setTheme } = useTheme("");
  const siteMap = [
    {
      name: "home",
      path: "/",
      icon: <HomeIcon />,
      route: true,
    },
    {
      name: "search",
      path: "/search",
      icon: <SearchIcon />,
      route: true,
    },
    // {
    //   name: "library",
    //   path: "/collection",
    //   icon: <LibIcon />,
    //   route: true,
    // },
    // {},
    // {
    //   name: "create playlist",
    //   path: "/play",
    //   icon: <PlusIcon />,
    // },
    // {
    //   name: "liked songs",
    //   path: "/collection/tracks",
    //   icon: <HeartIcon />,
    //   route: true,
    // },
    // {},
    {
      name: `${theme === "dark" ? "light" : "dark"} mode`,
      path: "/mode",
      icon: <AppModeIcon />,
      function: setTheme,
    },
  ];

  return (
    <nav className={`${styles.app_navigation} my-4`}>
      <ul className={styles.app_navigation_list}>
        {siteMap.map((el, i) => {
          if (el.name)
            if (el.route)
              return (
                <NavLink
                  title={capitalize(el.name)}
                  key={i}
                  styles={styles}
                  href={el.path}
                  exact={el.path === "/" ? true : false}
                  className={styles.app_nav_link}
                >
                  {el.icon}
                  {open ? <span>{el.name}</span> : null}
                </NavLink>
              );
            else {
              return (
                <li key={i} className={`${styles.app_nav_item}`}>
                  <div className="container">
                    <button
                      title={
                        el.path === "/mode"
                          ? "Change Theme Mode"
                          : capitalize(el.name)
                      }
                      className={styles.app_nav_link}
                      onClick={() => {
                        if (el.path === "/mode") {
                          el.function(theme === "light" ? "dark" : "light");
                        }
                      }}
                    >
                      {el.icon}
                      {open ? <span>{el.name}</span> : null}
                    </button>
                  </div>
                </li>
              );
            }
          else {
            return (
              <li key={i} className={`${styles.app_nav_item}`}>
                <div className="container">
                  <hr className={styles.list_divider} />
                </div>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
