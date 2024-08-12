import React from "react";
import { useState } from "react";
import "./Homepage.css";

//렌더링 컴포넌트

import ProductHeaderRegistBtn from "../components/ProductHeaderRegistBtn";
import ProductHeaderSearchBar from "../components/ProductHeaderSearchBar";
import ProductHeaderSortBtn from "../components/ProductHeaderSortBtn";
import ProductHeaderText from "../components/ProductHeaderText";

//렌더링 프레임
import HomepageRenderFooter from "../frame/HomepageRenderFooter.js";
import HomepageRenderHeader from "../frame/PageHeaderRender.js";
import ProductRenderGrid from "../frame/ProductRenderGrid.js";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

function Hompage() {
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 커스텀 훅
  const {
    bestProductCount,
    sellingProductCount,
    sellingProductCountPerRow,
    Device,
  } = useWindowWidhtSize();

  const { productsList: bestProductData, noProduct: bestNoProduct } =
    useProductData(1, bestProductCount, "favorite", "");

  const {
    productsList: sellingProductData,
    noProduct: sellingNoProduct,
    nowPage,
    totalPageSize,
    handlePageChange,
  } = useProductData(1, sellingProductCount, ProductSortOption, searchKeyword);

  // 검색어 핸들러
  const handleSeachKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSetProductSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <div className="homepage">
      <nav>
        <HomepageRenderHeader />
      </nav>
      <main className="mainProductShowSection">
        <section className="bestProductSection">
          <header className="ProductSectionHeader">
            <ProductHeaderText headerText={"베스트 상품"} />
          </header>
          <ProductRenderGrid
            productData={bestProductData}
            noProduct={bestNoProduct}
          />
        </section>
        <section className="sellingProductSection">
          <header className="ProductSectionHeader">
            <ProductHeaderText headerText={"판매 중인 상품"} />
            <ProductHeaderSearchBar
              inputText={searchKeyword}
              handleInput={handleSeachKeyword}
              device={Device}
            />
            <ProductHeaderRegistBtn />
            <ProductHeaderSortBtn
              handleSortOption={handleSetProductSortOption}
            />
          </header>
          <ProductRenderGrid
            productData={sellingProductData}
            productRowCount={2}
            productCountPerRow={sellingProductCountPerRow}
            noProduct={sellingNoProduct}
          />
        </section>
      </main>
      <HomepageRenderFooter
        nowPage={nowPage}
        handlePageChange={handlePageChange}
        totalPageSize={totalPageSize}
      />
    </div>
  );
}

export default Hompage;
