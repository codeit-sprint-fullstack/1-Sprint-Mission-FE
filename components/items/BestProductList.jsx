import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

const BestProductList = ({ products, loading }) => {
  return (
    <section className={styles.bestProductsSection}>
      <div
        className={`${styles.bestProductGrid} ${loading ? styles.loading : ""}`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} mode="best" />
        ))}
      </div>
    </section>
  );
};

export default BestProductList;
