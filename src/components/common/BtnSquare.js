import React from "react";
import styles from "./BtnSquare.module.css";

function BtnSquare({
  innerText = "버튼",
  handleOnClick = () => {},
  active = true,
}) {
  return (
    <>
      <button
        className={active ? styles.activeBtn : styles.disabledBtn}
        disabled={!active}
        onClick={handleOnClick}
      >
        {innerText}
      </button>
    </>
  );
}

export default BtnSquare;
