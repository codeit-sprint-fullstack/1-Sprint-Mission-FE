import React from "react";
import "../assets/styles/App.css";
import SortingOptionBox from "./sortOptionDropdown";
import SortingOptionBoxSmall from "./sortOptionDropdownSmall";
import KeywordSearch from "./keywordSearch";
import useViewportSize from "../hooks/useViewportSize";

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

  const { width } = useViewportSize();
  const isComponentAVisible = width > 744;

  return (
    <div className="product-management">
      <div className="sectionTitle">판매중인 상품</div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <KeywordSearch keyword={keyword} onSearch={handleSearch} />
        <button className="productPatchButton" onClick={onSearch}>
          상품 등록하기
        </button>
        {isComponentAVisible ? (
          <SortingOptionBox
            selectedOption={sortOption}
            onChange={setSortOption}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <SortingOptionBoxSmall
            selectedOption={sortOption}
            onChange={setSortOption}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
