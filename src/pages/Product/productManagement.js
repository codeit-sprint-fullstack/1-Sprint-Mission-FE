import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "assets/styles/App.css";
import SortingOptionBox from "components/sortOptionDropdown";
import KeywordSearch from "./keywordSearch";
import { sortingOptions } from "./constants";

function ProductManagement({
  sortOption,
  setSortOption,
  keyword,
  setKeyword,
  onSearch,
  setCurrentPage,
}) {
  const navigate = useNavigate();

  const handleSearch = (localKeyword) => {
    setKeyword(localKeyword);
    onSearch();
  };

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  return (
    <div className="product-management">
      <div className="section-title">판매중인 상품</div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <KeywordSearch keyword={keyword} onSearch={handleSearch} />
        <button className="product-patch-button" onClick={handleRegisterClick}>
          상품 등록하기
        </button>
        <SortingOptionBox
          selectedOption={sortOption}
          onChange={setSortOption}
          setCurrentPage={setCurrentPage}
          sortingOptions={sortingOptions}
        />
      </div>
    </div>
  );
}

export default ProductManagement;
