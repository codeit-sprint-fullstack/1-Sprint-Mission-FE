import React from "react";
import "./ProductListItem.css";
import img_default from "../assets/images/img_default.png";

function ProductListItem({ product }) {
  // 상품 이미지 없는 경우, 기본이미지 사용
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : img_default;

  return (
    <div className="product-card">
      <img src={productImage} alt={product.name} className="product-image" />
      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}원</p>
        <p className="product-favorite"> 💙 좋아요 {product.favoriteCount}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
