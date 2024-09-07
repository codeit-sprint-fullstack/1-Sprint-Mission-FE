import React from "react";
import styles from "./CtaBox.module.css";

function CtaBox({ keyword, mainCTA, description, alignRight }) {
  const rowVariableText = () => {
    return (
      <div className={styles.ctaText}>
        {mainCTA.map((text, index) => (
          <span key={index}>
            {alignRight && index > 0 && <>&nbsp;</>}
            {text}
            {!alignRight && index < mainCTA.length - 1 && <>&nbsp;</>}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`${styles.mainBox} ${alignRight ? styles.alignRight : ""}`}>
      {keyword && <div className={styles.keywordText}>{keyword}</div>}
      {rowVariableText()}
      {description && <p className={styles.descriptionText}>{description}</p>}
    </div>
  );
}

export default CtaBox;
