import styles from "./SearchBar.module.css";
import { useState } from "react";
export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
      />

      <div>
        <div className={styles.customDropdown}>
          <button
            className={styles.customDropdown__selected}
            onClick={toggleDropdown}
          >
            <span className={styles.customDropdown__text}>최신순</span>
          </button>
          {isOpen && (
            <div className={styles.customDropdown__options}>
              <div
                className={styles.option} //onClick={() => handleOptionClick("recent")}
              >
                최신순
              </div>
              <div
                className={styles.option} // onClick={() => handleOptionClick("favorite")}
              >
                좋아요순
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
