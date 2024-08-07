import React from "react";
import "./ProductRenderGrid.css";

// 컴포넌트
import ProductRender from "./ProductRender.js";


function ProductRenderGrid({
  productData,
  productCountPerRow,
  noProduct
}) {

  
  const ProductsGridRender = () => {
    const TempArrayProducts = [];

    for (let i = 0; i < productData.length; i += productCountPerRow) {
      TempArrayProducts.push(productData.slice(i, i + productCountPerRow));
    }

    return TempArrayProducts.map((item, rowGroupIndex) => (
      <ProductRender
        key={rowGroupIndex}
        productList={item}
      />
    ));
  };

  return (
    noProduct
    ? <section className="noProduct">상품이 없습니다.</section>
    : <section className="sellingProductList">{ProductsGridRender()}</section>
  );
}

export default ProductRenderGrid;
