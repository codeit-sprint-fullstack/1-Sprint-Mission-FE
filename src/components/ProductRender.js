import React from "react";
import iconHeart from "../images/icon/ic_heart.svg";

import "./ProductRender.css";

const Product = ({ maxProduct, image, title, price, like }) => {
  const Products = [];
  const renderProducts = () => {
    for (let i = 1; i <= maxProduct; i++) {
      Products.push(
        <li className="Product">
          <img src={image} alt="상품" />
          <figure className="ProductDescription">
            <span>{title}</span>
            <h1>{price}원</h1>
            <div className="ProductLike">
							<img src={iconHeart} alt="좋아요" />
              <span>{like}</span>
            </div>
          </figure>
        </li>
      );
    }
    return Products;
  };

  return <ul className="ProductsList">{renderProducts()}</ul>;
};

export default Product;
