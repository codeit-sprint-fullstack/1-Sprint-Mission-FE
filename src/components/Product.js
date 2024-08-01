import React from "react";
import iconHeart from "../images/icon/ic_heart.svg";
import "./Product.css";

const ProductRender = ({ product }) => {
  const { images, name, description, price, favoriteCount } = product;
  const [img] = images

  return (
    <li className="ProductBox">
      <img src={img} alt={name} />
      <figure className="ProductDescription">
        <span>{description}</span>
        <h1>{price}원</h1>
        <div className="ProductLike">
          <img src={iconHeart} alt="좋아요" />
          <span>{favoriteCount}</span>
        </div>
      </figure>
    </li>
  );
  }



export default ProductRender;