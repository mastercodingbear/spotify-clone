import React from "react";
import styles from "./.module.sass";
import { AiOutlinePoweroff } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { connect } from "react-redux";
export default connect((state) => state)(function ({ user }) {
  return (
    <div className={styles.user_actions_area}>
      <Link href={"/profile"}>
        <a title="My Account" className={styles.user_profile_btn}>
          <div className={styles.user_avatar}>
            <Image
              quality={100}
              width={26}
              height={26}
              src={user?.images[0]?.url}
              alt="user_avatar"
            />
          </div>
          <span className="d-none d-md-inline-block">{user?.display_name}</span>
        </a>
      </Link>
      <div className={styles.logout_btn}>
        <a
          title="Logout"
          href="logout"
          onClick={(e) => {
            e.preventDefault();
            window.localStorage.setItem("token", null);
            window.location.replace("/");
          }}
        >
          <AiOutlinePoweroff />
        </a>
      </div>
    </div>
  );
});
