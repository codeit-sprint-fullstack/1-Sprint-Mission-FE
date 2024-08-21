import React from "react";
import styles from "./Tags.module.css";

// 이미지
import roundX from "../../images/icon/ic_round_x.svg";

function Tags({ tagList = [] }) {
  const tagRender = (tag, idx) => {
    return (
      <li key={idx} className={styles.tagBox}>
        <span>{`#${tag}`}</span>
        <button>
          <img src={roundX} alt="X" />
        </button>
      </li>
    );
  };

  return (
    <ul className={styles.tagListContainer}>
      {tagList.map((tag, idx) => tagRender(tag, idx))}
    </ul>
  );
}

export default Tags;
