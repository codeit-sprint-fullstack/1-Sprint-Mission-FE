"use client";

import React from "react";
import styles from "./ProductListItem.module.css"; // CSS 모듈 임포트
import img_default from "../assets/images/img_default.png";

function ProductListItem({ product }) {
  // 상품 이미지 없는 경우, 기본이미지 사용
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : img_default;

  return (
    <div className={styles.productCard}>
      <img
        src={productImage}
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}원</p>
        <p className={styles.productFavorite}>
          {" "}
          💙 좋아요 {product.favoriteCount}
        </p>
      </div>
    </div>
  );
}

export default ProductListItem;
