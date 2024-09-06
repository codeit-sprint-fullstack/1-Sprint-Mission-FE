import React from "react";
import styles from "./BtnRoundFunction.module.css";

function BtnRoundFunction({
  //기본 props
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
      <button
        className={activeState ? styles.activeBtn : styles.disabledBtn}
        disabled={!activeState}
        style={{ width: customWidth ? customWidth : "" }}
        onClick={handleOnClick}
      >
        <span className={styles.btnText}>{innerText}</span>
        {imgSrc && <img src={imgSrc} alt={"아이콘"} />}
      </button>
    </>
  );
}

export default BtnRoundFunction;
