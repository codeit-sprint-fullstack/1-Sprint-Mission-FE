import React from "react";
import { useState } from "react";
import "./ProductHeaderSortBtn.css";

// 이미지
import arrow from "../images/icon/ic_arrow_down.svg";
import iconSort from "../images/icon/ic_sort.svg";

function ProductHeaderSortBtn({ handleSortOption, device}) {
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
      {device === "Mobile" 
      ? ( <button className="sortByBtnForMobile" onClick={toggleDropDownView}>
            <img src={iconSort} alt="클릭" />
          </button> ) 
      : ( <button className="sortByBtn" onClick={toggleDropDownView}>
            <span>{optionText}</span>
            <img src={arrow} alt="클릭" />
          </button> )
      }
      {dropDownView && (
        <ul className="dropDownList">
          <li onClick={(e) => { handleOptionTextChange(e); handleSortOption("recent");}}>최신순</li>
          <li onClick={(e) => { handleOptionTextChange(e); handleSortOption("favorite");}}> 좋아요순</li>
        </ul>
      )}
    </div>
  );
}

export default ProductHeaderSortBtn;
