import React from "react";
import CustomDropdown from "./CustomDropdown";
import Link from "next/link";
import styles from "./DesktopSearchBar.module.css";
import { ROUTES } from "@/utils/rotues";

export function DesktopSearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className={styles.searchBar}>
      <p className={styles.fontStyle}>판매 중인 상품</p>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={onKeywordChange}
        onKeyDown={onKeyDown}
      />
      <Link href={ROUTES.CREATE_PRODUCT}>
        <button className={styles.btnAdd}>상품 등록하기</button>
      </Link>

      <CustomDropdown
        selectedOption={sortOrder}
        onOptionChange={onSortChange}
      />
    </div>
  );
}
