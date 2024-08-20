import React from "react";
import { useState } from "react";
import styles from "./SortBtn.module.css";

// 이미지
import arrow from "../../images/icon/ic_arrow_down.svg";
import iconSort from "../../images/icon/ic_sort.svg";

function SortBtn({ handleSortOption, deviceType}) {
  const [dropDownView, viewChange] = useState(false);
  const [optionText, optionTextChange] = useState("최신순");

  const toggleDropDownView = () => {
    viewChange(!dropDownView);
  };

  const handleOptionTextChange = (e) => {
    toggleDropDownView();
    optionTextChange(e.target.textContent);
  };

  return (
    <div>
      <button className={styles.btnStyle} onClick={toggleDropDownView}>
        <div className={styles.largeBtnBox} >
          <span>{optionText}</span>
          <img src={arrow} alt="클릭" />
        </div> 
        <div className={styles.smallBtnBox}>
          <img src={iconSort} alt="클릭" />
        </div>
      </button>
      {dropDownView && (
        <ul className="dropDownList">
          <li onClick={(e) => { handleOptionTextChange(e); handleSortOption("recent");}}>최신순</li>
          <li onClick={(e) => { handleOptionTextChange(e); handleSortOption("favorite");}}> 좋아요순</li>
        </ul>
      )}
    </div>
  );
}

export default SortBtn;


// {deviceType === "Mobile" 
//   ? ( <button className={styles.forMobileBtn} onClick={toggleDropDownView}>
//         <img src={iconSort} alt="클릭" />
//       </button> ) 
//   : ( <button className={styles.btnBox} onClick={toggleDropDownView}>
//         <span>{optionText}</span>
//         <img src={arrow} alt="클릭" />
//       </button> )
//   }