import { useState } from "react";
import styles from "./SortOptions.module.css";

const SortOptions = ({ sortOrder, setSortOrder, screenType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = () => {
    // 모바일에서 버튼 클릭 시 sort-options를 토글
    if (screenType === "mobile") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={styles.sortOptionsContainer}>
      {screenType === "mobile" ? (
        <div className={styles.sortButton} onClick={handleSortClick} />
      ) : (
        <div className={styles.sortOptions}>
          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
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

      {isOpen && screenType === "mobile" && (
        <div className={`${styles.sortOptions} ${styles.active}`}>
          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
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

