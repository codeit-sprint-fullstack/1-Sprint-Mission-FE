import React from "react";
import styles from "./BtnSquareFunction.module.css";

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
