import BestPost from "@components/BestPost";
import Dropdown from "@components/Dropdown";
import MainPost from "@components/MainPost";
import SearchBar from "@components/SearchBar";
import styles from "@styles/Community.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";

export async function getStaticProps() {}

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
        <Link href="/create-post">
          <div className={`${styles.postButton} text-lg semibold`}>글쓰기</div>
        </Link>
      </div>
      <div className={styles.mainOption}>
        <SearchBar
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClear}
          onSearch={handleSearch}
        />
        <Dropdown />
      </div>
      <MainPost />
    </div>
  );
}
