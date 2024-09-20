import React from "react";
import styles from "./SortOptions.module.css";

const SortOptions = ({ sortOrder, setPage, screenType }) => {
  const handleSortClick = () => {
    // 모바일에서는 버튼 클릭 시 sort-options를 토글
    if (screenType === "mobile") {
      document.querySelector(`.${styles.sortOptions}`).classList.toggle(styles.active);
    }
  };

  return (
    <div className={styles.sortOptionsContainer}>
      {screenType === "mobile" ? (
        <div onClick={handleSortClick} className={styles.sortButton} />
      ) : (
        <div className={styles.sortOptions}>
          <select value={sortOrder} onChange={() => setPage(1)} className={styles.sortSelect}>
            <option value="recent">최신순</option>
            <option value="popular">인기순</option>
          </select>
          <img
            src="/image/down.svg"
            alt="Dropdown Icon"
            className={styles.dropdownIcon}
          />
        </div>
      )}
    </div>
  );
};

export default SortOptions;

