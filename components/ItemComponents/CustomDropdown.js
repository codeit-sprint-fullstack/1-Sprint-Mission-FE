import React, { useState } from "react";
import styles from "./CustomDropdown.module.css";

export const CustomDropdown = ({ selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    onOptionChange(value);
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.customDropdown}>
        <button
          className={styles.customDropdownSelected}
          onClick={toggleDropdown}
        >
          <span className={styles.customDropdownText}>
            {selectedOption === "recent" ? "최신순" : "좋아요순"}
          </span>
        </button>
        {isOpen && (
          <div className={styles.customDropdownOptions}>
            <div
              className={styles.option}
              onClick={() => handleOptionClick("recent")}
            >
              최신순
            </div>
            <div
              className={styles.option}
              onClick={() => handleOptionClick("favorite")}
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
