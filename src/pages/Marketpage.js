import React from "react";
import { useState } from "react";
import "./Marketpage.css";

//렌더링 컴포넌트
import ProductHeaderRegistBtn from "../components/ProductHeaderRegistBtn";
import ProductHeaderSearchBar from "../components/ProductHeaderSearchBar";
import ProductHeaderSortBtn from "../components/ProductHeaderSortBtn";
import ProductHeaderText from "../components/ProductHeaderText";

// 렌더링 프레임
import HomepageRenderFooter from "../frame/HomepageRenderFooter.js";
import HomepageRenderHeader from "../frame/PageHeaderRender.js";
import ProductRenderGrid from "../frame/ProductRenderGrid.js";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

function Marketpage() {
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 커스텀 훅

  const { sellingProductCount, sellingProductCountPerRow, Device } =
    useWindowWidhtSize();

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
    <div className="marketpage">
      <nav>
        <HomepageRenderHeader marketBoardActive={true} loginStatus={false} device={Device}/>
      </nav>

      <main>
        <section className="marketProductSection">
          {Device === "Mobile" ? (
            <header className="marketProductHeaderForMobile">
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
            </header>
          ) : (
            <header className="marketProductHeader">
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
          )}

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

export default Marketpage;
