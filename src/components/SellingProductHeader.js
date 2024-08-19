import React from "react";
import styles from "./SellingProductHeader.module.css";

import SearchBar from "./common/SearchBar.js";
import SortBtn from "./common/SortBtn.js";
import LinkBtn from "./common/LinkBtn.js";

function SellingProductHeader({text, handleSortOption, deviceType}) {
  return (
    deviceType !== "Mobile"
    ? ( <header className={styles.headerContaier}>
          <div className={styles.headrSubject}>{text}</div>
          <SearchBar />
          <LinkBtn Link={"/register"} text={"상품 등록하기"} />
          <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
        </header> 
      )
    : ( <header className={styles.headerContaierForMobile}>
          <div className={styles.headerContaier}>
            <div className={styles.headrSubject}>{text}</div>
            <LinkBtn Link={"/register"} text={"상품 등록하기"} />
          </div>
          <div className={styles.headerContaier}>
            <SearchBar />
            <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
          </div>
        </header> 
      )
  );
};

export default SellingProductHeader;
