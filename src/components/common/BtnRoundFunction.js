import React from "react";
import { Link } from "react-router-dom";
import styles from "./BtnRoundFunction.module.css";

// 이미지

function BtnRoundFunction({
  linkTo,
  innerText = "버튼",
  imgSrc,
  handleOnClick = () => {},
  activeState = true,
}) {

  return (
    <>
      {linkTo ? (
        <Link to={`/${linkTo}`}>
          <button
            className={activeState ? styles.activeBtn : styles.disabledBtn}
            disabled={!activeState}
            onClick={handleOnClick}
          >
            <span className={styles.btnText}>{innerText}</span>
            {imgSrc && <img src={imgSrc} alt={"아이콘"} />}
          </button>
        </Link>
      ) : (
        <button
          className={activeState ? styles.activeBtn : styles.disabledBtn}
          disabled={!activeState}
          onClick={handleOnClick}
        >
          {innerText}
        </button>
      )}
    </>
  );
}

export default BtnRoundFunction;
