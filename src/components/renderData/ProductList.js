import React from "react";
import styles from "./ProductList.module.css";

//리소스
const iconHeart = "/images/icon/ic_heart.svg";

function ProductList({ dataList }) {
  const ProductRender = ({ dataObject }) => {
    if (dataObject) {
      const { images, name, description, price, favoriteCount } = dataObject;
      const img= images[0];


      return (
        <figure className={styles.ProductBox}>
          <div className={styles.imgSizeControl}>
            <img src={img} alt={name} />
          </div>
          <figcaption className={styles.ProductInfoBox}>
            <p className={styles.description}>{description}</p>
            <p className={styles.price}>{`${price.toLocaleString()}원`}</p>
            <section className={styles.likeBox}>
              <img src={iconHeart} alt="좋아요" />
              <p>{favoriteCount}</p>
            </section>
          </figcaption>
        </figure>
      );
    } else {
      return (
        <figure className={styles.ProductBox}>
          <div className={styles.imgSizeControl}>
            <img src="/images/default/default_product.png" alt="상품 준비 중" />
          </div>
          <figcaption className={styles.productReady}>
            <p >상품 준비 중</p>
          </figcaption>
        </figure>
      );
    }
  };

  return (
    <article className={styles.productContainer}>
      {dataList.map((item, idx) => (
        <ProductRender key={item.id ? item.id : idx - 30} dataObject={item} />
      ))}
    </article>
  );
}

export default ProductList;
