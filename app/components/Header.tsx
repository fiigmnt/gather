import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="logo" />
      </div>
      <div className={styles.titleContainer}>
        <img src="/images/title.png" alt="title" />
      </div>
    </div>
  );
};

export default Header;
