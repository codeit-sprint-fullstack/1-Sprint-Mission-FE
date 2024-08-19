import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkBtn.module.css";

// 이미지

function LinkBtn(link, text) {
  return (
    <button className={styles.registerBtn}>
      <Link to={link}>{text}</Link>
    </button>
  );
}

export default LinkBtn;
