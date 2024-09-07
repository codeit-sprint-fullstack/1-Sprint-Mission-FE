import React from "react";
import styles from "./ContentBanner.module.css";

function ContentBanner({ children }) {
  return <div className={styles.contentBanner}>{children}</div>;
}

export default ContentBanner;

