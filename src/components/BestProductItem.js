import React from "react";
import styles from "./BestProducts.module.css"; // CSS 모듈 import

function BestProductItem({ product }) {
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/images/default_image.png"; // 기본 이미지 경로

  return (
    <div className={styles.bestProductItemCard}>
      <img
        src={imageSrc}
        alt={product.name}
        className={styles.bestProductImage}
      />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}원</p>
        <p className={styles.productFavorite}>
          💙 좋아요 {product.favoriteCount}
        </p>
      </div>
    </div>
  );
}

export default BestProductItem;
