// src/components/ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`); // 상품 상세 페이지로 이동
  };

  return (
    <div className={`product-card ${type}`} onClick={handleClick}>
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <p>좋아요 {product.favoriteCount}개</p>
    </div>
  );
}

export default ProductCard;
