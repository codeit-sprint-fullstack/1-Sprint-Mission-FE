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
          offset: 0,
          limit: 20, // 전체 상품 목록을 가져오기 위해
        });
        console.log("전체 상품 응답 데이터:", response);

        // 응답 데이터가 배열인 경우 좋아요 수 기준으로 정렬
        const sortedProducts = response.sort(
          (a, b) => b.favoriteCount - a.favoriteCount
        );

        // 상위 4개 상품만 설정
        setProducts(sortedProducts.slice(0, 4));
      } catch (error) {
        console.error("베스트 상품을 불러오는데 실패했습니다.", error);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <section className={styles.bestProducts}>
      <div className={styles.bestProductList}>
        {products.map((product) => (
          <BestProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestProducts;
