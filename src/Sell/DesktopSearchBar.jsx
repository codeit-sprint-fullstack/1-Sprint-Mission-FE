import React from "react";
import CustomDropdown from "./CustomDropdown";
import { useNavigate } from "react-router-dom";

export function DesktopSearchBar({
  keyword,
  onKeywordChange,
  onKeyDown,
  sortOrder,
  onSortChange,
}) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleRegistration = () => {
    navigate("/registration");
  };

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
      <button className="btnAdd" onClick={handleRegistration}>
        상품 등록하기
      </button>
      <CustomDropdown
        selectedOption={sortOrder}
        onOptionChange={onSortChange}
      />
    </div>
  );
}
