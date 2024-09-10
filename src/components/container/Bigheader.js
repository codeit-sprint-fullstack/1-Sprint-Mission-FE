import React from "react";
import styles from "./Bigheader.module.css";

export const Bigheader = ({ children }) => {
  return (
    <section className={styles.bigheaderSection}>
      {children}
    </section>
  )
}

export default Bigheader;