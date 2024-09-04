import React from "react";
import { Link } from "react-router-dom";
import styles from "./BtnRoundFunction.module.css";

// 이미지

function BtnRoundFunction({
  //기본 props
  linkTo,
  innerText = "버튼",
  imgSrc,

  //스타일 커스텀
  customWidth,

  //핸들러
  handleOnClick = () => {},

  //상태 관리
  activeState = true,
}) {

  return (
    <>
      {linkTo ? (
        <Link to={`/${linkTo}`}>
          <button
            className={activeState ? styles.activeBtn : styles.disabledBtn}
            disabled={!activeState}
            style={{ width: customWidth ? customWidth : '' }}
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
          style={{ width: customWidth ? customWidth : '' }}
          onClick={handleOnClick}
        >
          {innerText}
        </button>
      )}
    </>
  );
}

export default BtnRoundFunction;
