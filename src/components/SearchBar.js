import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ setKeyword }) => {
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <img src="/image/glass.svg" alt="Search Icon" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="검색할 게시글을 입력해주세요"
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;

