import React from "react";
import styles from "./MainContainer.module.css";

function MainContain({ children, customGap }) {
  return (
    <main
      className={styles.mainContainer}
      style={{ gap: customGap ? customGap : "" }}
    >
      {children}
    </main>
  );
}

export default MainContain;
