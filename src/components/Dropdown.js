import Image from "next/image";
import { useState } from "react";

import arrowDown from "@images/arrowDownIcon.png";
import styles from "@styles/Dropdown.module.css";

function Dropdown({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("최신순");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setOption(option);
    setIsOpen(false);
    onSortChange(option);
  };

  return (
    <div className={styles.dropdown} onClick={toggleDropdown}>
      <span className={`${styles.dropdownContent} text-lg regular`}>
        {option}
      </span>
      <Image
        className={styles.arrowDown}
        src={arrowDown}
        alt="arrow down"
        width={24}
        height={24}
      />
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            className={`${styles.dropdownOption} text-lg regular`}
            onClick={() => handleOptionClick("최신순")}
          >
            최신순
          </div>
          <div
            className={`${styles.dropdownOption} text-lg regular`}
            onClick={() => handleOptionClick("오래된순")}
          >
            오래된순
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
