import React from "react";
import { useState, useEffect } from "react";
import "./Homepage.css";

//섹션 렌더
import Header from "../components/Header.js";
import Footer from "../components/Footer";
// import Nav from "../components/Nav";

// api
import getProductList from "../api/getproducts.js";

//테스트
import ProductSectionRender from "../components/ProductSectionRender.js";

const HomePage = () => {
  const [nowPage, setnowPage] = useState(1);
  const [totalPageSize, setMaxPageCount] = useState(1);
  const [productMaxCount, setproductMaxCount] = useState(10);
  const [lineProductMaxCount, setlineProductMaxCount] = useState(5);

  const handlePageChange = (page) => {
    setnowPage(page);
  };

  useEffect(() => {
    getProductList()
      .then((data) => {
        console.log(`data.totalCount: ${data.totalCount}`);
        setMaxPageCount(Math.ceil(data.totalCount / productMaxCount));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <Header />
      <div className="bodySet">
      <ProductSectionRender
          nowPage={1}
          sort="favorite"
          productMaxCount={4}
          navHeaderText={"베스트 상품"}
        />
        <ProductSectionRender
          nowPage={nowPage}
          productMaxCount={productMaxCount}
          lineProductMaxCount={lineProductMaxCount}
          navHeaderText={"판매 중인 상품"}
          handlePageChange={handlePageChange}
          isNav={true}
        />
      </div>
      <Footer
        nowPage={nowPage}
        handlePageChange={handlePageChange}
        totalPageSize={totalPageSize}
      />
    </main>
  );
};

export default HomePage;
