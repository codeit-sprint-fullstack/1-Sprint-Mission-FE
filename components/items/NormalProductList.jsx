import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

const NormalProductList = ({ products, loading }) => {
  return (
    <section className={styles.normalProductsSection}>
      <div
        className={`${styles.normalProductGrid} ${
          loading ? styles.loading : ""
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} mode="normal" />
        ))}
      </div>
    </section>
  );
};

export default NormalProductList;
