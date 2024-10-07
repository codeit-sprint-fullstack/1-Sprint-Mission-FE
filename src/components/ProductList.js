"use client";

import React from "react";
import styles from "./ProductList.module.css"; // CSS 모듈 임포트
import ProductListItem from "./ProductListItem";

function ProductList({ products }) {
  if (!Array.isArray(products)) {
    return <div>상품 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <section className={styles.saleProducts}>
      <ul className={styles.productList}>
        {products.map((product) => (
          // ProductListItem에 imageUrl을 prop로 전달
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
