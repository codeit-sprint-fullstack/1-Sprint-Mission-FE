import styles from "./SearchBar.module.css";
import { useState, ChangeEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  keyword: string;
  onKeywordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export default function SearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const options = [
    { value: "recent", label: "최신순" },
    { value: "favorite", label: "좋아요순" },
  ];

  const handleOptionClick = (value: string) => {
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
