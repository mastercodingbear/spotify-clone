import React from "react";
import styles from "./.module.sass";
export default function LoaderWrapper() {
  return (
    <div className={styles.load_spinner_wrapper}>
      <div className={`spinner-grow ${styles.grow_spinner}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
