import Image from "next/image";
import styles from "./SearchBar.module.scss";
import searchIcon from "../../public/assets/icons/ic_search.svg";
import { useState } from "react";
import Button from "../ui/Button";

export default function SearchBar({
  setKeyword,
  placeholder = "검색어를 입력해 주세요",
}) {
  const [search, setSearch] = useState("");

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleClick = () => {
    e.preventDefault();
    setKeyword(search);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setKeyword(search);
      console.log(search);
    }
  };

  return (
    <form className={styles.SearchBar}>
      <input
        placeholder={placeholder}
        value={search}
        name="search"
        onKeyDown={handleKeyDown}
        onChange={handleValueChange}
        autoComplete="off"
      />
      <Button type="button" variant="icon" onClick={handleClick}>
        <Image src={searchIcon} width={24} height={24} alt="search icon" />
      </Button>
    </form>
  );
}
