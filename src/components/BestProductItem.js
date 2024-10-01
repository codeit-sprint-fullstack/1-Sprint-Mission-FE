import React from "react";

function BestProductItem({ product }) {
  return (
    <div className={styles.bestProductItemCard}>
      <img
        src={product.images[0]}
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
