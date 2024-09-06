import React from "react";
import styles from "./SearchBar.module.css";

//리소스
const ic_search = "/images/icon/ic_search.svg";

function SearchBar({
  inputValue,
  handleInputOnChange = () => {},
  handleInputOnBlur = () => {},
  handleOnKeyDown = () => {},
  placeholderText = "검색할 내용을 입력해주세요",
}) {
  return (
    <>
      <div className={styles.searchBox}>
        <img src={ic_search} alt="검색" />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputOnChange}
          onBlur={handleInputOnBlur}
          onKeyDown={handleOnKeyDown}
          placeholder={placeholderText}
        />
      </div>
    </>
  );
}

export default SearchBar;
