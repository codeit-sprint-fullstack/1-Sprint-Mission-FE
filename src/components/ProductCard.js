import React from 'react';
import './ProductCard.css';
import { useLocation } from 'react-router-dom';

const ProductCard = ({ product, isBestProduct }) => {
  const location = useLocation();
  const isMarketPage = location.pathname === '/items';

  const imageSrc = '/image/img_default.svg';

  return (
    <div className={`product-card ${isBestProduct ? 'best-product-card' : ''}`}>
      <img 
        src={imageSrc} 
        alt={product.name} 
        className={`product-image ${isBestProduct ? 'best-product-image' : ''}`}
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

