import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

const BestProductList = ({ products, loading }) => {
  if (products.length === 0 && !loading) {
    return <div>표시할 상품이 없습니다.</div>;
  }
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
