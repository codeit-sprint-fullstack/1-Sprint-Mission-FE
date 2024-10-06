import React from "react";
import styles from "../styles/postdetail.module.css"; // 기존 스타일을 가져옴
import ProductBackButton from "./ProductBackButton";

const ProductEmptyComments = () => {
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

