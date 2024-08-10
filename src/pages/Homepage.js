import React, { useEffect } from "react";
import { useState } from "react";
import "./Homepage.css";

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

function Hompage() {
  const [sellingProductCount, setSellingProductCount] = useState(10);
  const [bestProductCount, setBestProductCount] = useState(4);
  const [sellingProductCountPerRow, setSellingProductCountPerRow] = useState(5);
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 커스텀 훅
  const { productsList: bestProductData, noProduct: bestNoProduct } =
    useProductData(1, bestProductCount, "favorite", "");

  const {
    productsList: sellingProductData,
    noProduct: sellingNoProduct,
    nowPage,
    totalPageSize,
    handlePageChange,
  } = useProductData(1, sellingProductCount, ProductSortOption, searchKeyword);

  const {windowWidhth} = useWindowWidhtSize();

  useEffect(() => {
    if (windowWidhth < 745) {
      setSellingProductCount(6);
      setBestProductCount(2);
    } else if (windowWidhth < 376) {
      setSellingProductCount(4);
      setBestProductCount(1);
    }
  }, [windowWidhth]);

  const handleSeachKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSetProductSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <div className="homepage">
      <HomepageRenderHeader />
      <main>
        <div className="productSectionSet">
          <section className="bestProductSection">
            <div className="productRenderHeader">
              <ProductHeaderText headerText={"베스트 상품"} />
            </div>
            <ProductRenderGrid
              productData={bestProductData}
              productCountPerRow={bestProductCount}
              noProduct={bestNoProduct}
            />
          </section>
          <section className="sellingProductSection">
            <div className="productRenderHeader">
              <ProductHeaderText headerText={"베스트 상품"} />
              <ProductHeaderSearchBar
                inputText={searchKeyword}
                handleInput={handleSeachKeyword}
              />
              <ProductHeaderRegistBtn />
              <ProductHeaderSortBtn
                handleSortOption={handleSetProductSortOption}
              />
            </div>
            <ProductRenderGrid
              productData={sellingProductData}
              productCountPerRow={sellingProductCountPerRow}
              noProduct={sellingNoProduct}
            />
          </section>
        </div>
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
