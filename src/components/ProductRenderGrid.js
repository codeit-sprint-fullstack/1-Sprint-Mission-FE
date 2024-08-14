import React from "react";
import "./ProductRenderGrid.css";

// 컴포넌트
import ProductRender from "./ProductRender.js";

function ProductRenderGrid({ productData, productRowCount = 1, noProduct }) {
  const ProductsGridRender = () => {
    const TempArrayProducts = [];

    if (productRowCount > 1) {
      const productCountPerRow = productData.length / productRowCount;

      for (let i = 0; i < productData.length; i += productCountPerRow) {
        TempArrayProducts.push(productData.slice(i, i + productCountPerRow));
      }

      return TempArrayProducts.map((item, rowGroupIndex) => (
        <ProductRender key={rowGroupIndex} productList={item} />
      ));
    } else {
      return <ProductRender productList={productData} />;
    }
  };


  if (noProduct) {
    return <section className="noProduct">상품이 없습니다.</section>
  } else {
    return <section className="showProductList">{ProductsGridRender()}</section>
  };
}

export default ProductRenderGrid;
