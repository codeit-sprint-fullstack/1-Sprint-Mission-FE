import React from "react";
import styles from "./TextBtn.module.css";

function TextBtn({ btnActive = false, text}) {
  return (
    <button
      className={btnActive ? styles.btnActive : styles.btn}
      disabled={btnActive}
    >
      {text}
    </button>
  );
}

export default TextBtn;
