import Image from "next/image";
import styles from "./SearchBar.module.scss";
import searchIcon from "../../public/assets/icons/ic_search.svg";
import { useState } from "react";

export default function SearchBar({ setKeyword }) {
  const [search, setSearch] = useState("");

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setKeyword(search);
    }
  };

  return (
    <form className={styles.SearchBar}>
      <input
        placeholder="검색할 상품을 입력해 주세요"
        value={search}
        name="search"
        onKeyDown={handleKeyDown}
        onChange={handleValueChange}
        autoComplete="off"
      />
      <button>
        <Image src={searchIcon} width={24} height={24} />
      </button>
    </form>
  );
}
