"use client";

import React, { useEffect, useState } from "react";
import styles from "./BestProducts.module.css"; // CSS 모듈 import
import { getProductList } from "../api/api";
import BestProductItem from "./BestProductItem";

function BestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const response = await getProductList({
          order: "favoriteCount",
          offset: 0,
          limit: 4,
        });
        console.log("베스트 상품 응답 데이터:", response);

        // 응답 데이터가 배열인 경우 직접 사용
        const sortedProducts = response.sort(
          (a, b) => b.favoriteCount - a.favoriteCount
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("베스트 상품을 불러오는데 실패했습니다.", error);
      }
    };

    fetchBestProducts();
  }, []);

  const topProducts = products.slice(0, 4);

  return (
    <section className={styles.bestProducts}>
      <div className={styles.bestProductList}>
        {topProducts.map((product) => (
          <BestProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestProducts;
