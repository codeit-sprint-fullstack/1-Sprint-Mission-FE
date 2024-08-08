import React from "react";
import CustomDropdown from "./CustomDropdown";
import { useNavigate } from "react-router-dom";

export function MobileSearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/registration");
  };
  return (
    <div className="mobileSearchBar">
      <div className="mobileBar">
        <p className="fontStyle">판매 중인 상품</p>
        <button className="btnAdd" onClick={handleRegistration}>
          상품 등록하기
        </button>
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
