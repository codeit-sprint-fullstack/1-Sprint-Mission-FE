import React from "react";
import "./productHeaderText.css";

function ProductHeaderSearchBar (searchText, handleInput) {
  return (
    <div className="searchBox">
      <img src={search} alt="검색" />
      <input
        type="text"
        value={searchText}
        onChange={handleInput}
        placeholder="검색할 상품을 입력해주세요"
      />
    </div>
  );
}

export default ProductHeaderSearchBar;