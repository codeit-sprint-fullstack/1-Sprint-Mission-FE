import React from "react";
import styles from "./Bigheader.module.css";

export const Bigheader = ({ children }) => {
  return (
    <header className={styles.bigheaderSection}>
      {children}
    </header>
  )
}

export default Bigheader;