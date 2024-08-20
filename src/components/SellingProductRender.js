import React from "react";
import stlyes from "./SellingProductRender.module.css";

// 컴포넌트
import ProductRenderPerRow from "./common/ProductRenderPerRow.js";

function SellingProductRender({ productData }) {
  const arraySlice = () => {
    let maxCountPerRow = productData.length / 2;
    const resultArray = [];

    for (let i = 0; i < productData.length; i += maxCountPerRow) {
      resultArray.push(productData.slice(i, i + maxCountPerRow));
    }

    return resultArray;
  };

  const ProductsGridRender = () => {
    return arraySlice().map((item, rowGroupIndex) => (
      <ProductRenderPerRow key={rowGroupIndex} productList={item} />
    ));
  };

  if (productData) {
    return (
      <div className={stlyes.productContainer}>
        <section className={stlyes.showProductList}>
          {ProductsGridRender()}
        </section>
      </div>
    );
  } else {
    return <section className={stlyes.noProduct}>상품이 없습니다.</section>;
  }
}

export default SellingProductRender;
