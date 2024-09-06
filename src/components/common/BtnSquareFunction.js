import React from "react";
import { Link } from "react-router-dom";
import styles from "./BtnSquareFunction.module.css";

// 이미지

function BtnSquareFunction({
  innerText = "버튼",
  handleOnClick = () => {},
  activeState = true,
}) {
  return (
    <>
      <button
        className={activeState ? styles.activeBtn : styles.disabledBtn}
        disabled={!activeState}
        onClick={handleOnClick}
      >
        {innerText}
      </button>
    </>
  );
}

export default BtnSquareFunction;
