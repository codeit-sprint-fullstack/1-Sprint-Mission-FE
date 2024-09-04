import React from "react";
import { Link } from "react-router-dom";
import styles from "./FunctionBtn.module.css";

// 이미지

function FunctionBtn({ linkTo, innerText = "버튼", activeState = true }) {
  return (
    <>
      {linkTo ? (
        <Link to={`/${linkTo}`}>
          <button
            className={activeState ? styles.activeBtn : styles.disabledBtn}
            disabled={!activeState}
          >
            {innerText}
          </button>
        </Link>
      ) : (
        <button
          className={activeState ? styles.activeBtn : styles.disabledBtn}
          disabled={!activeState}
        >
          {innerText}
        </button>
      )}
    </>
  );
}

export default FunctionBtn;
