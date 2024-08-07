import React from "react";
import "./ProductRenderHeader.css";

//컴포넌트
import ProductHeaderRegistBtn from "./ProductHeaderRegistBtn";
import ProductHeaderSearchBar from "./ProductHeaderSearchBar";
import ProductHeaderSortBtn from "./ProductHeaderSortBtn";
import ProductHeaderText from "./ProductHeaderText";

function ProductRenderHeader({
  headerText,
  searchBar = false,
  registBtn = false,
  sortBtn = false,
  inputText,
  handleInput,
  handleSortOption
}) {
  return (
    <div className="productRenderHeader">
      <ProductHeaderText headerText={headerText} />
      {searchBar && (
        <ProductHeaderSearchBar
        inputText={inputText}
          handleInput={handleInput}
        />
      )}
      {registBtn && <ProductHeaderRegistBtn />}
      {sortBtn && <ProductHeaderSortBtn handleSortOption={handleSortOption} />}
    </div>
  );
}

export default ProductRenderHeader;
