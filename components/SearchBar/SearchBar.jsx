import Image from "next/image";
import styles from "./SearchBar.module.scss";
import searchIcon from "../../public/assets/icons/ic_search.svg";
import { useState } from "react";
import Button from "../ui/Button";

export default function SearchBar({
  setKeyword,
  placeHolder = "검색어를 입력해 주세요",
}) {
  const [search, setSearch] = useState("");

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleClick = () => {
    setKeyword(search);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setKeyword(search);
      console.log(search);
    }
  };

  return (
    <form className={styles.SearchBar}>
      <input
        placeholder={placeHolder}
        value={search}
        name="search"
        onKeyDown={handleKeyDown}
        onChange={handleValueChange}
        autoComplete="off"
      />
      <Button type="icon" onClick={handleClick}>
        <Image src={searchIcon} width={24} height={24} alt="search icon" />
      </Button>
    </form>
  );
}
