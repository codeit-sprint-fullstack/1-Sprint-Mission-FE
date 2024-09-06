import React from "react";
import styles from "./SortBtn.module.css";

// 이미지
const ic_arrow_down = "images/icon/ic_arrow_down.svg";
const ic_sort = "images/icon/ic_sort.svg";

function SortBtn({ CurrentOption, toggleModalState }) {
  return (
    <>
      <button className={styles.btnStyle} onClick={toggleModalState}>
        <div className={styles.largeBtnBox} >
          <span>{CurrentOption}</span>
          <img src={ic_arrow_down} alt="클릭" />
        </div> 
        {/* 반응형으로 정렬 버튼 변경*/}
        <div className={styles.smallBtnBox}>
          <img src={ic_sort} alt="클릭" />
        </div>
      </button>
    </>
  );
}

export default SortBtn;

