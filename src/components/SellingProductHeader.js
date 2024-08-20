import React from "react";
import styles from "./SellingProductHeader.module.css";

import SearchBar from "./common/SearchBar.js";
import SortBtn from "./common/SortBtn.js";
import LinkBtn from "./common/LinkBtn.js";

function SellingProductHeader({ text, handleSortOption, deviceType }) {
  return (
    <div className={styles.headerContaier}>
      <div className={styles.textBox}>
        <span className={styles.headerText}>{text}</span>
      </div>
      <div className={styles.functionBox}>
        <SearchBar />
        <LinkBtn Link={"/register"} text={"상품 등록하기"} />
        <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
      </div>
    </div>
    // deviceType !== "Mobile"
    // ? ( <header className={styles.headerContaier}>
    //       <div className={styles.textBox}>{text}</div>
    //       <div className={styles.functionBox}>
    //         <SearchBar />
    //         <LinkBtn Link={"/register"} text={"상품 등록하기"} />
    //         <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
    //       </div>
    //     </header>
    //   )
    // : ( <header className={styles.headerContaierForMobile}>
    //       <div className={styles.headerContaier}>
    //         <div className={styles.headrSubject}>{text}</div>
    //         <LinkBtn Link={"/register"} text={"상품 등록하기"} />
    //       </div>
    //       <div className={styles.headerContaier}>
    //         <SearchBar />
    //         <SortBtn handleSortOption={handleSortOption} deviceType={deviceType} />
    //       </div>
    //     </header>
    //   )
  );
}

export default SellingProductHeader;
