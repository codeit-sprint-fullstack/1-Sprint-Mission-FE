import React from "react";
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
  const handleSearch = (localKeyword) => {
    setKeyword(localKeyword);
    onSearch();
  };

  return (
    <div className="product-management">
      <div className="section-title">판매중인 상품</div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <KeywordSearch keyword={keyword} onSearch={handleSearch} />
        <button className="product-patch-button" onClick={onSearch}>
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
