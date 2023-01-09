import React from "react";
import styles from "./.module.sass";
import NavBtns from "../NavBtns";
import SearchInput from "../SearchInput";
import UserActions from "../UserActions";
import { connect } from "react-redux";

export default connect((state) => state)(function ActionsTopBar({
  isSticky,
  workView,
}) {
  return (
    <header
      style={isSticky ? { background: workView?.bgColor } : null}
      className={`${styles.actions_top_bar} ${
        isSticky ? styles.stick_top : null
      }`}
    >
      <div className={styles.container}>
        <div className="row align-items-center  g-0">
          <div className="col-6 col-sm-8">
            <div className="align-items-center d-flex">
              <NavBtns />
              <SearchInput />
            </div>
          </div>
          <div className="col-6 col-sm-4 text-end">
            <UserActions />
          </div>
        </div>
      </div>
    </header>
  );
});
