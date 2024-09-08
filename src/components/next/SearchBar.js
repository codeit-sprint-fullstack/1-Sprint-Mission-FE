import React from 'react';
import styles from './SearchBar.module.css'; // CSS 모듈로 변경

const SearchBar = ({ setKeyword }) => {
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.searchBar}> {/* CSS 모듈 방식으로 변경 */}
      <img src="/image/glass.svg" alt="Search Icon" className={styles.searchIcon} /> {/* CSS 모듈 방식으로 변경 */}
      <input
        type="text"
        placeholder="게시글 검색"
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;

