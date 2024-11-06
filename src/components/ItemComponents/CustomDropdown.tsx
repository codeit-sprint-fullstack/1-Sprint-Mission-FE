import React, { useState } from "react";
import styles from "./CustomDropdown.module.css";

// Props 타입 정의
interface CustomDropdownProps {
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedOption,
  onOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const options = [
    { value: "recent", label: "최신순" },
    { value: "favorite", label: "좋아요순" },
  ];

  const handleOptionClick = (value: string) => {
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
