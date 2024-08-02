import React from "react";

import "./ProductRender.css";
import iconHeart from "../images/icon/ic_heart.svg";

function ProductListRender({ productList, isThereProduct }) {
  const ProductRender = ({ product }) => {
    const { images, name, description, price, favoriteCount } = product;
    const [img] = images;

    return (
      <li className="ProductBox">
        <article className="imgSizeControl">
          <img src={img} alt={name} />
        </article>
        <figure className="ProductDescription">
          <span>{description.toLocaleString()}</span>
          {price === 0 ? "" : <h1>{`${price.toLocaleString()}원`}</h1>}
          {favoriteCount === 0 ? (
            ""
          ) : (
            <div className="ProductLike">
              <img src={iconHeart} alt="좋아요" />
              <span>{favoriteCount}</span>
            </div>
          )}
        </figure>
      </li>
    );
  };


  if (isThereProduct) {
    return <div className="noProduct">상품이 없습니다.</div>;
  } else {
    return (
      <ul className="productContainer">
        {productList.map((item, idx) => (
          <ProductRender key={item.id ? item.id : idx - 30} product={item} />
        ))}
      </ul>
    );
  }
}

export default ProductListRender;
