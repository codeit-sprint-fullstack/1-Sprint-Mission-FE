import React from "react";
import styles from "./Tags.module.css";

// 이미지
const icRoundX = "/images/icon/ic_round_x.svg";

function Tags({ tagList = [], tagDelete}) {

  const tagRender = (tag) => {
    return (
      <li key={tag} className={styles.tagBox}>
        <span>{`#${tag}`}</span>
        <button onClick={() => tagDelete(tag)}>
          <img src={icRoundX} alt="X" />
        </button>
      </li>
    );
  };

  return (
    <ul className={styles.tagListContainer}>
      {tagList.map((tag) => tagRender(tag))}
    </ul>
  );
}

export default Tags;
