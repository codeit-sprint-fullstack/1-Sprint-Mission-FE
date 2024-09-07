import React from "react";
import styles from "./ContainerContent.module.css";

function ContainerContent({ children, customGap }) {
  return (
    <main>
      <div
        className={styles.ContainerContent}
        style={{ gap: customGap ? customGap : "" }}
      >
        {children}
      </div>
    </main>
  );
}

export default ContainerContent;
