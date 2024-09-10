import React from "react";
import styles from "./CommonContainer.module.css";

function CommonContainer({ children, style }) {
  return (
    <main>
      <div
        className={styles.containerContent}
        style={{ gap: style?.gap, padding: style?.padding }}
      >
        {children}
      </div>
    </main>
  );
}

export default CommonContainer;
