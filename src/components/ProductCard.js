import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, isBestProduct }) => {
  return (
    <div className={`product-card ${isBestProduct ? 'best-product-card' : ''}`}>
      <img src={product.images[0]} alt={product.name} className={`product-image ${isBestProduct ? 'best-product-image' : ''}`} />
      <h3>{product.name}</h3>
      <p className="price">{product.price}원</p>
      <div className="favorite">
        <img src="/image/heart.svg" alt="Favorite" />
        <span>{product.favoriteCount}</span>
      </div>
    </div>
  );
};

export default ProductCard;

