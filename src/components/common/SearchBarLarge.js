import React from "react";
import styles from "./SearchBarLarge.module.css";

//리소스
import search from "../../images/icon/ic_search.svg";

function SearchBarLarge({ inputText, handleInput }) {
  return (
    <div className={styles.containerSet}>
      <div className={styles.inputBox}>
        <img src={search} alt="검색" />
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          placeholder="검색할 상품을 입력해주세요"
        />
      </div>
    </div>
  );
}

export default SearchBarLarge;
