import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkBtn.module.css";

// 이미지

function LinkBtn({ link, btnActive = false, text }) {
  return (
    <Link to={link}>
      <button className={styles.linkBtn} disabled={btnActive}>
        {text}
      </button>
    </Link>
  );
}

export default LinkBtn;
