import React from "react";
import "./ProductList.css";
import ProductListItem from "./ProductListItem";

function ProductList({ products }) {
  if (!Array.isArray(products)) {
    return <div>상품 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <section className="sale-products">
      <ul className="product-list">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
