import React from "react";
import "assets/styles/App.css";
import SortingOptionBoxSmall from "components/sortOptionDropdownSmall";
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
      <div className="pm-container-small">
        <div className="section-title">판매중인 상품</div>

        <button className="product-patch-button" onClick={onSearch}>
          상품 등록하기
        </button>
      </div>
      <div className="pm-container-small" style={{ gap: "8px" }}>
        <KeywordSearch
          keyword={keyword}
          onSearch={handleSearch}
          style={{ order: "0" }}
        />
        <SortingOptionBoxSmall
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
