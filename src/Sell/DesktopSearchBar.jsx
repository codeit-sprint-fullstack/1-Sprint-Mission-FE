import React from "react";
import CustomDropdown from "./CustomDropdown";

export function DesktopSearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="searchBar">
      <p className="fontStyle">판매 중인 상품</p>
      <input
        className="inputSearch"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={onKeywordChange}
        onKeyDown={onKeyDown}
      />
      <button className="btnAdd">상품 등록하기</button>
      <CustomDropdown
        selectedOption={sortOrder}
        onOptionChange={onSortChange}
      />
    </div>
  );
}
