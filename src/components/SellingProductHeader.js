import React from "react";
import styles from "./SellingProductHeader.module.css";

import SearchBar from "./common/SearchBar.js";
import SortBtn from "./common/SortBtn.js";
import LinkBtn from "./common/LinkBtn.js";

function SellingProductHeader({ text, handleSortOption, deviceType }) {
  return (
    deviceType === "PC"
      ? ( <header className={styles.headerContaier}>
            <span className={styles.headerText}>{text}</span>
            <div className={styles.functionBox}>
              <SearchBar />
              <LinkBtn Link={"/register"} text={"상품 등록하기"} />
              <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
            </div>
          </header>
      )
    : ( <header className={styles.twoLineContainer}>
          <div className={styles.perRowBox}>
            <span className={styles.headerText}>{text}</span>
            <LinkBtn Link={"/register"} text={"상품 등록하기"} />
          </div>
          <div className={styles.perRowBox}>
            <SearchBar />
            <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
          </div>
        </header>
      )
  );
}

export default SellingProductHeader;

