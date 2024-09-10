import BestPost from "@components/BestPost";
import SearchBar from "@components/SearchBar";
import styles from "@styles/Community.module.css";
import { useState } from "react";

export default function Community() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearch = () => {
    console.log(`검색 실행: ${searchValue}`);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className={styles.body}>
      <h1 className={`${styles.postTitle} text-xl bold`}>베스트 게시글</h1>
      <BestPost />
      <div className={styles.mainTitle}>
        <h1 className={`${styles.postTitle} text-xl bold`}>게시글</h1>
        <div className={`${styles.postButton} text-lg semibold`}>글쓰기</div>
      </div>
      <div className={styles.mainOption}>
        <SearchBar
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClear}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
