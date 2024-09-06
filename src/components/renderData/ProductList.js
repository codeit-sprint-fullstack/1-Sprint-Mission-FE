import React from "react";
import styles from "./ProductList.module.css";

//리소스
const iconHeart = "/images/icon/ic_heart.svg";

function ProductList({ dataList }) {
  const ProductRender = ({ dataObject }) => {
    const { images, name, description, price, favoriteCount } = product;
    try {
      const [img] = images;
    } catch (error) {
      const img = product.images
    }
    

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
      {dataList.map((item, idx) => (
        <ProductRender key={item.id ? item.id : idx - 30} dataObject={item} />
      ))}
    </ul>
  );
}

export default ProductList;
