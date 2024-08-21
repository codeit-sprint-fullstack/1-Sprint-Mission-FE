import React from "react";
import styles from "./TextBtn.module.css";

function TextBtn({ btnActive = true, text, disable = false }) {
  return (
    <button
      className={`${styles.btn} ${btnActive && styles.btnActive}`}
      disabled={btnActive}
    >
      {text}
    </button>
  );
}

export default TextBtn;
