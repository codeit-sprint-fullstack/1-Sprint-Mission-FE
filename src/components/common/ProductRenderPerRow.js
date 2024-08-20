import React from "react";

import styles from "./ProductRenderPerRow.module.css";
import iconHeart from "../../images/icon/ic_heart.svg";

function ProductRenderPerRow({ productList }) {
  const ProductRender = ({ product }) => {
    const { id, images, name, description, price, favoriteCount } = product;
    const [img] = images;

    return (
      <li className={styles.ProductBox}>
        <article className={styles.imgSizeControl}>
          <img src={img} alt={name} />
        </article>
        <figure className={styles.ProductDescription}>
          <span>{description.toLocaleString()}</span>
          <h1>{`${price.toLocaleString()}원`}</h1>
          <div className={styles.ProductLike}>
            <img src={iconHeart} alt="좋아요" />
            <span>{favoriteCount}</span>
          </div>
        </figure>
      </li>
    );
  };

  return (
    <ul className={styles.productContainer}>
      {productList.map((item, idx) => (
        <ProductRender key={item.id ? item.id : idx - 30} product={item} />
      ))}
    </ul>
  );
}

export default ProductRenderPerRow;
