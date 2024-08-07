import React from "react";
import heartFullImage from "../images/favoriteFullHeart-small.png";
import heartEmptyImage from "../images/favoriteEmptyHeart-small.png";
import "../styles/Product.css";

const Product = ({ product, className }) => {
  return (
    <div className={`${className}`}>
      <img
        className="product-image"
        src={product.images}
        alt={product.description}
      />
      <p className="description text-md medium">{product.description}</p>
      <p className="price text-lg bold">
        {product.price.toLocaleString("en-US")}원
      </p>
      <div className="favorites">
        <img
          className="favorite-heart"
          src={heartEmptyImage}
          alt="favorite heart"
        />
        <p className="favorite-count text-xs medium">{product.favoriteCount}</p>
      </div>
    </div>
  );
};

export default Product;
