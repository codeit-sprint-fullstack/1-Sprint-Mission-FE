import { useState } from "react";
import Link from "next/link";
import ic_search from "../public/images/ic_search.png";
import styles from "@/styles/searchBar.module.css";
import Image from "next/image";
import DropdownBox from "@/components/DropdownList/DropdownBox";

function SearchBar({ onChange, orderBy, isMobile = false }) {
  const [keyword, setKeyword] = useState();

  const handleChangeOrder = (e) => {
    const value = e.target.value;
    onChange("orderBy", value);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange("keyword", keyword);
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.first_block}>
        <h2>판매 중인 상품</h2>
        {isMobile && (
          <Link href="/Products/Registration">
            <button className={styles.add_product_btn}>상품 등록하기</button>
          </Link>
        )}
      </div>
      <div className={styles.search_query_container}>
        <div className={styles.input_and_icon}>
          <Image
            className={styles.ic_search}
            alt="돋보기아이콘"
            src={ic_search}
          ></Image>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChangeKeyword}
              name="keyword"
              className={styles.keyword}
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </form>
        </div>
        {!isMobile && (
          <Link href="/Products/Registration">
            <button className={styles.add_product_btn}>상품 등록하기</button>
          </Link>
        )}
        <DropdownBox
          onOrderChange={handleChangeOrder}
          orderBy={orderBy}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default SearchBar;
