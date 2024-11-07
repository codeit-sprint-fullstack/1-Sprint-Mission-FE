import React from "react";
import styles from "../styles/postdetail.module.css";
import ProductBackButton from "./ProductBackButton";

const ProductEmptyComments: React.FC = () => {
  return (
    <>
      <img
        src="/image/product_empty.svg"
        alt="Reply Icon"
        className={styles.replyIcon}
      />
      <p className={styles.noCommentsText}>아직 문의가 없어요</p>
    </>
  );
};

export default ProductEmptyComments;
