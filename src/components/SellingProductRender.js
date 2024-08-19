import React from "react";
import stlyes from "./ProductGridRender.module.css";

// 컴포넌트
import ProductRender from "./common/ProductRender.js";


function ProductGridRender({
  productData,
  productRowCount = 1,
  productCountPerRow,
  noProduct
}) {
  const ProductsGridRender = () => {
    const TempArrayProducts = [];
    if (productRowCount > 1) {
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
    return <section className={stlyes.noProduct}>상품이 없습니다.</section>;
  } else {
    return (
      <div className={stlyes.productContainer}>
        <section className={stlyes.showProductList}>
          {ProductsGridRender()}
        </section>
      </div>
    );
  }
}

export default ProductGridRender;
