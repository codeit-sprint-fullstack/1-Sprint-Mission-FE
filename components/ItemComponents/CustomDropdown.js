import React, { useState } from "react";
import styles from "./CustomDropdown.module.css";

export const CustomDropdown = ({ selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const options = [
    { value: "recent", label: "최신순" },
    { value: "favorite", label: "좋아요순" },
  ];

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
            {options.map((option) => (
              <div
                key={option.value}
                className={styles.option}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
