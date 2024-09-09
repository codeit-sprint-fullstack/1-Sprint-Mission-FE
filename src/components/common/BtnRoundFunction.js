import React from "react";
import styles from "./BtnRoundFunction.module.css";

function BtnRoundFunction({
  //기본 props
  innerText = "버튼",
  imgSrc,

  //인라인스타일
  inlineBtnStyle = {},

  //핸들러
  handleOnClick = () => {},

  //상태 관리
  activeState = true,
}) {
  return (
    <>
      <button
        className={`${styles.basicBtn} ${!activeState && styles.disabledBtn}`}
        disabled={!activeState}
        style={inlineBtnStyle}
        onClick={handleOnClick}
      >
        <span className={styles.btnText}>{innerText}</span>
        {imgSrc && <img src={imgSrc} alt={"아이콘"} />}
      </button>
    </>
  );
}

export default BtnRoundFunction;
