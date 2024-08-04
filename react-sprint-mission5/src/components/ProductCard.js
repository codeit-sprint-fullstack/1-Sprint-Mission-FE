// src/components/ProductCard.js
import React from "react";
import "./ProductCard.css";

function ProductCard({ product, type }) {
  const cardClass = type === "best" ? "best-product-card" : "full-product-card";
  return (
    <div className={cardClass}>
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <p>좋아요 {product.favoriteCount}개</p>
    </div>
  );
}

export default ProductCard;
