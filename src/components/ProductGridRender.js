import React from "react";

import { useEffect, useState } from "react";
import search from "../images/icon/ic_search.svg";
import arrow from "../images/icon/ic_arrow_down.svg";
import "./ProductSectionRender.css";
import "./ProductsListNav.css";

import useProductData from "../hooks/useProductData.js";

import ProductRender from "../src/components/ProductRender.js";
import getProductList from "../src/api/getProductsData.js";

function ProductListRender({
  nowPage = 1,
  productRowCount,
  productColumnCount = 1,
  sort = "recent",
  keyword = ''
}) {
  //옵션
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const totoalProductCount = productRowCount * productColumnCount;
    setProductData(useProductData(nowPage, totoalProductCount, sort, keyword));
  }, [nowPage, sort, keyword]);

  // 상품 불러오기


  const ProductsGridRender = () => {
    const TempArrayProducts = [];

    for (let i = 0; i < productData.length; i += productRowCount) {
      TempArrayProducts.push(productData.slice(i, i + productRowCount));
    }

    return TempArrayProducts.map((item, rowGroupIndex) => (
      <ProductRender
        key={rowGroupIndex}
        productList={item}
      />
    ));
  };

  return (
    productData === null
    ? <section className="noProduct">상품이 없습니다.</section>
    : <section className="sellingProductList">{ProductsGridRender()}</section>
  );
}

export default ProductListRender;
