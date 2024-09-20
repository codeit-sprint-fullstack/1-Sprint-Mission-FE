import React, { useState, useCallback } from "react";
import searchIcon from "../../public/images/ic_search.png";
import styles from "./SearchBar.module.css"; // CSS 모듈

const SearchBar = ({
  onSearch,
  onOrderChange,
  order,
  searchPosts,
  setSearchPosts,
}) => {
  const [searchError, setSearchError] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchChange = (event) => {
    setSearchPosts(event.target.value);
  };

  const handleSearchClick = useCallback(() => {
    if (searchPosts.trim() === "") {
      setSearchError("⚠ 검색어를 입력해 주세요.");
      return;
    }
    onSearch(searchPosts);
    setSearchError(null);
  }, [searchPosts, onSearch]);

  return (
    <div className={styles.inputDrop}>
      <input
        type="text"
        placeholder="검색할 게시글을 입력해주세요"
        className={styles.freeSearchInput}
        style={{ backgroundImage: `url(${searchIcon.src})` }}
        value={searchPosts}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <select
        className={styles.sortDropDown}
        onChange={onOrderChange}
        value={order}
      >
        <option value="createdAt">최신순</option>
        <option value="likeCount">좋아요 순</option>
      </select>
      {searchError && <div className={styles.searchError}>{searchError}</div>}
    </div>
  );
};

export default SearchBar;
