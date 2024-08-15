import React, { useState } from "react";
import "./SellList.css";

export const CustomDropdown = ({ selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // const handleOptionClick = (value) => {
  //   onOptionChange(value);
  //   setIsOpen(false);
  // };

  return (
    <div>
      <div className="custom-dropdown">
        <button className="custom-dropdown__selected" onClick={toggleDropdown}>
          <span className="custom-dropdown__text">
            {selectedOption === "recent" ? "최신순" : "좋아요순"}
          </span>
        </button>
        {/* 버튼 클릭 상태가 true일 때 html 출력 */}
        {isOpen && (
          <div className="custom-dropdown__options">
            <div
              className="option" /*onClick={() => handleOptionClick("recent")}*/
            >
              최신순
            </div>
            <div
              className="option"
              // onClick={() => handleOptionClick("favorite")}
            >
              좋아요순
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
