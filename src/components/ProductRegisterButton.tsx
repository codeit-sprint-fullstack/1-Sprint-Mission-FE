import React from "react";
import { useRouter } from "next/router";
import styles from "./ProductRegisterButton.module.css";

const ProductRegisterButton = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/items/registration");
  };

  return (
    <button className={styles.registerButton} onClick={handleRegisterClick}>
      상품 등록하기
    </button>
  );
};

export default ProductRegisterButton;

