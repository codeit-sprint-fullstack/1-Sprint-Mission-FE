import React from "react";
import styles from "./ContentContain.module.css";

function ContentContain({ children, customGap }) {
  return (
    <main>
      <div
        className={styles.contentContainer}
        style={{ gap: customGap ? customGap : "" }}
      >
        {children}
      </div>
    </main>
  );
}

export default ContentContain;
