import React from "react";
import { useState, useEffect } from "react";
import "./Homepage.css";

//렌더링 컴포넌트
import HomepageRenderFooter from "../components/HomepageRenderFooter.js";
import HomepageRenderHeader from "../components/HomepageRenderHeader.js";
import ProductRenderGrid from "../components/ProductRenderGrid.js";
import ProductRenderHeader from "../components/ProductRenderHeader.js";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import getWindowSize from "../hooks/useWindowWidhtSize.js";

function Hompage() {
  const [nowPage, setnowPage] = useState(1);
  const [sellingProductCount, setSellingProductCount] = useState(10);
  const [bestProductCount, setBestProductCount] = useState(4);
  const [sellingProductCountPerRow, setSellingProductCountPerRow] = useState(5);
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 커스텀 훅 
  const { bestProductData } = useProductData(
    1,
    bestProductCount,
    "favorite",
    ""
  );
  const { sellingProductData, totalPageSize } = useProductData(
    1,
    sellingProductCount,
    ProductSortOption,
    searchKeyword
  );

 // 홈페이지 useEffect
  useEffect(() => {
    bestProductData();
  }, [nowPage]);

  useEffect(() => {
    sellingProductData();
  }, [nowPage, sellingProductCount, ProductSortOption, searchKeyword]);
  

  // 공통 핸들러
  const handlePageChange = (page) => {
    setnowPage(page);
  };

  const handleSeachKeyword = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleSetProductSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <body>
      <HomepageRenderHeader />
      <main>
        <div className="productSectionSet">
          <section className="bestProductSection">
            <ProductRenderHeader headerText={"베스트 상품"} />
            <ProductRenderGrid
              productData={bestProductData}
              productCountPerRow={bestProductCount}
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
              handelSortOption={handleSetProductSortOption}
            />
            <ProductRenderGrid
              productData={sellingProductData}
              productCountPerRow={sellingProductCountPerRow}
            />
          </section>
        </div>
      </main>
      <HomepageRenderFooter
        nowPage={nowPage}
        handlePageChange={handlePageChange}
        totalPageSize={totalPageSize}
      />
    </body>

    // <ProductSectionRender
    //     nowPage={1}
    //     sort="favorite"
    //     productMaxCount={4}
    //     navHeaderText={"베스트 상품"}
    //   />
    //   <ProductSectionRender
    //     nowPage={nowPage}
    //     productMaxCount={productMaxCount}
    //     lineProductMaxCount={lineProductMaxCount}
    //     navHeaderText={"판매 중인 상품"}
    //     handlePageChange={handlePageChange}
    //     isNav={true}
    //   />
    // </div>
  );
}

export default Hompage;
