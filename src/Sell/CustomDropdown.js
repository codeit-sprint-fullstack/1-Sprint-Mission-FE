import React, { useState } from "react";
import "./Sell.css"; // CSS 파일을 따로 관리\

export const CustomDropdown = ({ selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false); // 버튼 클릭 여부

  const toggleDropdown = () => setIsOpen(!isOpen); // 버튼 클릭시 현재 상태에서 반전

  // 옵션 선택시 Dropdown 닫기
  const handleOptionClick = (option, value) => {
    onOptionChange(value);
    setIsOpen(false);
  };

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
    </div>
  );
};

export default CustomDropdown;
