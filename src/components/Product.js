import React from "react";
import heartFullImage from "../images/favoriteFullHeart-small.png";
import heartEmptyImage from "../images/favoriteEmptyHeart-small.png";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img
        className="product-image"
        src={product.images}
        alt={product.description}
      />
      <p className="description">{product.description}</p>
      <p className="price">{product.price}원</p>
      <div className="favorites">
        <img
          className="favorite-heart"
          src={heartEmptyImage}
          alt="favorite heart"
        />
        <p className="favorite">{product.favorite}</p>
      </div>
    </div>
  );
};

export default Product;
