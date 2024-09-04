import { useState } from "react";
import Link from "next/link";
import ic_search from "../public/images/ic_search.png";
import ic_arrow_down from "../public/images/ic_arrow_down.png";
import ic_sort from "../public/images/ic_sort.png";
import styles from "@/styles/searchBar.module.css";
import Image from "next/image";

function DropDownBox({ onOrderChange, order, isMobile = false }) {
  const [dropView, setDropView] = useState(false);
  const viewDropbox = () => {
    setDropView((e) => !e);
  };
  const handleOrderChange = (e) => onOrderChange(e);
  const dropDownBox = {
    recent: "최신순",
    favorite: "좋아요순",
  };
  return (
    <div>
      <div className={styles.search_order_container} onClick={viewDropbox}>
        <button className={styles.order_drop_btn}>
          {!isMobile && dropDownBox[order]}
        </button>
        <Image
          className={styles.ic_arrow_down}
          src={isMobile ? ic_sort : ic_arrow_down}
          alt="드롭다운아이콘"
        ></Image>
      </div>
      {dropView && (
        <div className={styles.dropbox_list}>
          <button
            className={styles.firstdrop}
            name="order"
            value="recent"
            onClick={handleOrderChange}
          >
            {dropDownBox.recent}
          </button>
          <button
            className={styles.lastdrop}
            name="order"
            value="favorite"
            onClick={handleOrderChange}
          >
            {dropDownBox.favorite}
          </button>
        </div>
      )}
    </div>
  );
}

function SearchBar({ onChange, order, isMobile = false }) {
  const [keyword, setKeyword] = useState();

  const onOrderChange = (e) => {
    const name = [e.target.name];
    const value = [e.target.value];
    onChange(name, value);
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
