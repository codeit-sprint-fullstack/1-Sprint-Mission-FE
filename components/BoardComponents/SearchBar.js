import styles from "./SearchBar.module.css";
import { useState } from "react";
import Image from "next/image";
import sort from "@/images/ic_sort.png";

export default function SearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

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
            {sortOrder === "favorite" ? "좋아요순" : "최신순"}
          </span>
        </button>
        {isOpen && (
          <div className={styles.customDropdown__options}>
            <div
              className={styles.option}
              onClick={() => handleOptionClick("createdAt")}
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
}
