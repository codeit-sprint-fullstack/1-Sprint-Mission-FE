import React from "react";
import styles from "./CtaBox.module.css";

export const RenderTopCTA = ({ mainCTA }) => {
  return (
    <div className={`${styles.topBottomMainBox}`}>
      <div className={`${styles.topCtaText}`}>
        {mainCTA.map((text, index) => (
          <span key={index}>
            {index > 0 && <>&nbsp;</>}
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export const RenderBottomCTA = ({ mainCTA }) => {
  return (
    <div className={`${styles.topBottomMainBox}`}>
      <div className={`${styles.bottomCtaText}`}>
        {mainCTA.map((text, index) => (
          <span key={index}>
            {index > 0 && <>&nbsp;</>}
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export const CtaBox = React.memo(
  ({ keyword, mainCTA, description, alignRight }) => {
    const renderCTA = () => {
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

    const renderDescription = () => {
      return (
        <div className={styles.descriptionText}>
          {description.map((text, index) => (
            <span key={index}>
              {alignRight && index > 0 && <>&nbsp;</>}
              {text}
              {!alignRight && index < description.length - 1 && <>&nbsp;</>}
            </span>
          ))}
        </div>
      );
    };

    return (
      <div
        className={`${styles.mainBox} ${alignRight ? styles.alignRight : ""}`}
      >
        {keyword && <div className={styles.keywordText}>{keyword}</div>}
        {renderCTA()}
        {description && renderDescription()}
      </div>
    );
  }
);

export default CtaBox;
