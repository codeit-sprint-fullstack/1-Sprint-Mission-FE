import React from "react";
import "./ProductHeaderSearchBar.css";

//리소스
import search from "../images/icon/ic_search.svg";

function ProductHeaderSearchBar({ inputText, handleInput, device }) {
  const ProductHeaderSearchBarRender = () => {
    if (device === "PC") {
      return (
        <div className="searchBox">
          <img src={search} alt="검색" />
          <input
            type="text"
            value={inputText}
            onChange={handleInput}
            placeholder="검색할 상품을 입력해주세요"
          />
        </div>
      );
    } else if (device === "Tablet") {
      return (
        <div className="searchBox">
          <img src={search} alt="검색" />
          <input
            className="inputForTablet"
            type="text"
            value={inputText}
            onChange={handleInput}
            placeholder="검색할 상품을 입력해주세요"
          />
        </div>
      );
    } else if (device === "Mobile") {
      return (
        <div className="searchBox">
          <img src={search} alt="검색" />
          <input
            className="inputForMobile"
            type="text"
            value={inputText}
            onChange={handleInput}
            placeholder="검색할 상품을 입력해주세요"
          />
        </div>
      );
    }
  };

  return <ProductHeaderSearchBarRender />;
}

export default ProductHeaderSearchBar;
