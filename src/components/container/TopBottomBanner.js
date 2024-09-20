import React from "react";
import styles from "./TopBottomBanner.module.css";

function TopBottomBanner({ children }) {
  return <div className={styles.bannerContain}>{children}</div>;
}

export default TopBottomBanner;