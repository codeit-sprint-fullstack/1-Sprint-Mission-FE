import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/images/ic_search.png";
import { ChangeEvent, useState } from "react";
import { SearchProps } from "@/types/Types";

export default function Search({ onSearch }: SearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchBar}>
      <Image className={styles.searchIcon} src={searchIcon} alt="search" />
      <input
        className={styles.search}
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
}
