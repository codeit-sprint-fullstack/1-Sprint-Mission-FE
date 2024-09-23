import React from "react";
import CustomDropdown from "./CustomDropdown";
import Link from "next/link";
import styles from "./MobileSearchBar.module.css";
import { ROUTES } from "@/utils/rotues";

export function MobileSearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className={styles.mobileSearchBar}>
      <div className={styles.mobileBar}>
        <p className={styles.fontStyle}>판매 중인 상품</p>
        <Link href={ROUTES.CREATE_PRODUCT}>
          <button className={styles.btnAdd}>상품 등록하기</button>
        </Link>
      </div>
      <div className={styles.mobileBar}>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={keyword}
          onChange={onKeywordChange}
          onKeyDown={onKeyDown}
        />
        <CustomDropdown
          selectedOption={sortOrder}
          onOptionChange={onSortChange}
        />
      </div>
    </div>
  );
}
