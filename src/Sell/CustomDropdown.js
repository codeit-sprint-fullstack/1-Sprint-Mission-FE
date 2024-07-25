import React, { useState } from "react";
import "./Sell.css"; // CSS 파일을 따로 관리\

export const CustomDropdown = ({ selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option, value) => {
    onOptionChange(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="custom-dropdown">
        <button className="custom-dropdown__selected" onClick={toggleDropdown}>
          <span className="custom-dropdown__text">
            {selectedOption === "recent" ? "최신순" : "좋아요순"}
          </span>
        </button>
        {isOpen && (
          <div className="custom-dropdown__options custom-dropdown__options--open">
            <div
              className="option"
              onClick={() => handleOptionClick("최신순", "recent")}
            >
              최신순
            </div>
            <div
              className="option"
              onClick={() => handleOptionClick("좋아요순", "favorite")}
            >
              좋아요순
            </div>
          </div>
        )}
      </div>
      <div className="mobile-custom-dropdown"></div>
    </>
  );
};

export default CustomDropdown;
