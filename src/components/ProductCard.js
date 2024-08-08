import React from 'react';
import './ProductCard.css';
import { useLocation } from 'react-router-dom';

const ProductCard = ({ product, isBestProduct }) => {
  const location = useLocation();
  const isMarketPage = location.pathname === '/items';
  const isDefaultImage = isMarketPage && (!product.images || product.images.length === 0);
  
  return (
    <div className={`product-card ${isBestProduct ? 'best-product-card' : ''}`}>
      <img 
        src={isDefaultImage ? 'image/img_default.svg' : product.images[0]} 
        alt={product.name} 
        className={`product-image ${isBestProduct ? 'best-product-image' : ''} ${isDefaultImage ? 'default-size' : ''}`}
      />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price.toLocaleString()}원</p>
      <div className="favorite">
        <img src="/image/heart.svg" alt="Favorite" />
        <span>{product.favoriteCount}</span>
      </div>
    </div>
  );
};

export default ProductCard;

