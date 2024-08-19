import React from "react";
import "./ProductHeader.css";

//컴포넌트
import ProductHeaderRegistBtn from "./ProductHeaderRegistBtn";
import ProductHeaderSearchBar from "./ProductHeaderSearchBar";
import ProductHeaderSortBtn from "./common/ProductHeaderSortBtn";
import ProductHeaderText from "./ProductHeaderText";

function ProductHeader () {

  return (
    <div>
          <div className="marketProductHeader">
      <ProductHeaderText headerText={"판매 중인 상품"} />
      <ProductHeaderRegistBtn />
    </div>
    <div className="marketProductHeader">
    <ProductHeaderSearchBar
      inputText={searchKeyword}
      handleInput={handleSeachKeyword}
      device={Device}
      />
    <ProductHeaderSortBtn
      handleSortOption={handleSetProductSortOption}
      device={Device}
    />
    </div>

    </div>



  ) ;
};

