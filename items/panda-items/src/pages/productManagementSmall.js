import React from "react";
import "../assets/styles/App.css";
import SortingOptionBoxSmall from "./sortOptionDropdownSmall";
import KeywordSearch from "./keywordSearch";

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
        <div className="sectionTitle">판매중인 상품</div>

        <button className="productPatchButton" onClick={onSearch}>
          상품 등록하기
        </button>
      </div>
      <div
        className="pm-container-small"
        style={{ gap: "8px"}}
      >
        <KeywordSearch
          keyword={keyword}
          onSearch={handleSearch}
          style={{ order: "0" }}
        />
        <SortingOptionBoxSmall
          selectedOption={sortOption}
          onChange={setSortOption}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductManagement;
