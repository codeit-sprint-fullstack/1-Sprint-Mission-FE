import React from "react";
import { useState } from "react";
import "./Homepage.css";

//렌더링 컴포넌트
import HomepageRenderFooter from "../components/HomepageRenderFooter.js";
import HomepageRenderHeader from "../components/HomepageRenderHeader.js";
import ProductRenderGrid from "../components/ProductRenderGrid.js";
import ProductRenderHeader from "../components/ProductRenderHeader.js";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useControlPage from "../hooks/useControlPage.js";
// import getWindowSize from "../hooks/useWindowWidhtSize.js";

function Hompage() {
  const [sellingProductCount, setSellingProductCount] = useState(10);
  const [bestProductCount, setBestProductCount] = useState(4);
  const [sellingProductCountPerRow, setSellingProductCountPerRow] = useState(5);
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");



  // 커스텀 훅
  const { getProductList: bestProductData, noProduct: bestNoProduct } =
    useProductData(1, bestProductCount, "favorite", "");

  const { getProductList: sellingProductData, noProduct: sellingNoProduct } =
    useProductData(1, sellingProductCount, ProductSortOption, searchKeyword);

  const {
    nowPage,
    totalPageSize,
    handlePageChange,
  } = useControlPage(1, sellingProductCount)


  const handleSeachKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSetProductSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <div>
      <HomepageRenderHeader />
      <main>
        <div className="productSectionSet">
          <section className="bestProductSection">
            <ProductRenderHeader headerText={"베스트 상품"} />
            <ProductRenderGrid
              productData={bestProductData}
              productCountPerRow={bestProductCount}
              noProduct={bestNoProduct}
            />
          </section>
          <section className="sellingProductSection">
            <ProductRenderHeader
              headerText={"판매 중인 상품"}
              searchBar={true}
              registBtn={true}
              sortBtn={true}
              inputText={searchKeyword}
              handleInput={handleSeachKeyword}
              handleSortOption={handleSetProductSortOption}
            />
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
