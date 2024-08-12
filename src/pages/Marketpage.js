import React, { useEffect } from "react";
import { useState } from "react";
import "./Marketpage.css";

//렌더링 컴포넌트
import HomepageRenderFooter from "../components/HomepageRenderFooter.js";
import HomepageRenderHeader from "../components/HomepageRenderHeader.js";
import ProductRenderGrid from "../components/ProductRenderGrid.js";

import ProductHeaderRegistBtn from "../components/ProductHeaderRegistBtn";
import ProductHeaderSearchBar from "../components/ProductHeaderSearchBar";
import ProductHeaderSortBtn from "../components/ProductHeaderSortBtn";
import ProductHeaderText from "../components/ProductHeaderText";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

function Marketpage() {
  const [sellingProductCount, setSellingProductCount] = useState(10);

  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 커스텀 훅

  const {
    productsList: sellingProductData,
    noProduct: sellingNoProduct,
    nowPage,
    totalPageSize,
    handlePageChange,
  } = useProductData(1, sellingProductCount, ProductSortOption, searchKeyword);

  const windowWidhth = useWindowWidhtSize();

  // 화면 유즈 이펙트
  useEffect(() => {
    if (windowWidhth > 769) {
      setSellingProductCount(10);
    } else if (windowWidhth < 768 && windowWidhth > 375) {
      setSellingProductCount(6);
    } else {
      setSellingProductCount(4);
    }
  }, [windowWidhth]);

  // 검색어 핸들러
  const handleSeachKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSetProductSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <main className="marketpage">
      <nav>
        <HomepageRenderHeader marketBoardActive={true} />
      </nav>
      <section className="marketProductSection">
        <header className="marketProductHeader">
          <ProductHeaderText headerText={"판매 중인 상품"} />
          <ProductHeaderSearchBar
            inputText={searchKeyword}
            handleInput={handleSeachKeyword}
          />
          <ProductHeaderRegistBtn />
          <ProductHeaderSortBtn handleSortOption={handleSetProductSortOption} />
        </header>
        <ProductRenderGrid
          productData={sellingProductData}
          productRowCount={2}
          noProduct={sellingNoProduct}
        />
      </section>
      <HomepageRenderFooter
        nowPage={nowPage}
        handlePageChange={handlePageChange}
        totalPageSize={totalPageSize}
      />
    </main>
  );
}

export default Marketpage;
