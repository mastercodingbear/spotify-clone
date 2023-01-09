import React from "react";
import styles from "./.module.sass";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";

export default function NavBtns() {
  const router = useRouter();

  return (
    <div className="d-none d-md-block me-4">
      <div className={styles.app_nav_btns_container}>
        <button
          title="Go Back"
          className={styles.app_nav_btn}
          disabled={router.pathname === "/"}
          onClick={()=>router.push("/")}
        >
          <FiChevronLeft />
          Back To Homepage
        </button>
      </div>
    </div>
  );
}
