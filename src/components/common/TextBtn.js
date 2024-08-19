import React from "react";
import styles from "./TextBtn.module.css";

function TextBtn({ btnActive = true, text }) {
  return (
    <button className={`${styles.btn} ${btnActive && styles.btnActive}`}>
      {text}
    </button>
  );
}

export default TextBtn;
