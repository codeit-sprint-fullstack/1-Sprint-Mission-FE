import React from "react";
import heartIcon from "assets/images/ic-heart.png";
import "assets/styles/App.css";

function ProductCard({ product, className }) {
  return (
    <div>
      <img src={product.images} alt={product.name} className={className} />
      <h2 className="product-title">{product.name}</h2>
      <p className="product-price">{product.price} 원</p>
      <span
        className="product-favorite"
        style={{ alignItems: "center", display: "flex", gap: "4px" }}
      >
        <img src={heartIcon} alt="Heart_Icon"></img>
        {product.favoriteCount}
      </span>
    </div>
  );
}

export default ProductCard;
