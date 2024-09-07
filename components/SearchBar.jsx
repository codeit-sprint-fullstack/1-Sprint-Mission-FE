import { useState } from "react";
import Link from "next/link";
import ic_search from "../public/images/ic_search.png";
import ic_arrow_down from "../public/images/ic_arrow_down.png";
import ic_sort from "../public/images/ic_sort.png";
import styles from "@/styles/searchBar.module.css";
import Image from "next/image";
import DropdownBox from "@/components/DropdownBox.jsx";

function SearchBar({ onChange, order, isMobile = false }) {
  const [keyword, setKeyword] = useState();

  const onOrderChange = (e) => {
    const value = e.target.value;
    onChange("orderBy", value);
  };

  const handleKeyword = (e) => {
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
          <Link href="/regisration">
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
              onChange={handleKeyword}
              name="keyword"
              className={styles.keyword}
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </form>
        </div>
        {!isMobile && (
          <Link href="/Registration">
            <button className={styles.add_product_btn}>상품 등록하기</button>
          </Link>
        )}
        <DropDownBox
          onOrderChange={onOrderChange}
          order={order}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default SearchBar;
