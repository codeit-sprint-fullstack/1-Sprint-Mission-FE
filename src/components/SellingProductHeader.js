import React from "react";
import styles from "./SellingProductHeader.module.css";

import SearchBar from "./common/SearchBar.js";
import SortBtn from "./common/SortBtn.js";
import LinkBtn from "./common/LinkBtn.js";

function SellingProductHeader(text, deviceType) {
  return (
    deviceType !== "Mobile"
    ? ( <header className={styles.headerContaier}>
          <div className={styles.headrSubject}>{text}</div>
          <SearchBar />
          <LinkBtn link={"/register"} text={"상품 등록하기"} />
        </header> 
      )
    : ( <header className={styles.headerContaierForMobile}>
          <div className={styles.headerContaier}>
            <div className={styles.headrSubject}>{text}</div>
            <LinkBtn link={"/register"} text={"상품 등록하기"} />
          </div>
          <div className={styles.headerContaier}>
            <SearchBar />
            <SortBtn deviceType={deviceType} />
          </div>
        </header> 
      )
  );
};

export default SellingProductHeader;
