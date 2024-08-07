import React from "react";
import CustomDropdown from "./CustomDropdown";

export function MobileSearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="mobileSearchBar">
      <div className="mobileBar">
        <p className="fontStyle">판매 중인 상품</p>
        <button className="btnAdd">상품 등록하기</button>
      </div>
      <div className="mobileBar">
        <input
          className="inputSearch"
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
