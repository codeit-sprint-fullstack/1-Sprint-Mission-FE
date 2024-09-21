import styles from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const options = [
    { value: "createdAt", label: "최신순" },
    { value: "favorite", label: "좋아요순" },
  ];

  const handleOptionClick = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={onKeywordChange}
        onKeyDown={onKeyDown}
      />

      <div className={styles.customDropdown}>
        <button
          className={styles.customDropdown__selected}
          onClick={toggleDropdown}
        >
          <span className={styles.customDropdown__text}>
            {options.find((option) => option.value === sortOrder)?.label ||
              "정렬 기준"}
          </span>
        </button>
        {isOpen && (
          <div className={styles.customDropdown__options}>
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
}
