import styles from "./BestProducts.module.css";
import Image from "next/image";
import { formatPrice } from "@/utils/price";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useState, useEffect } from "react";
import { throttle } from "@/utils/throttle";
import img_default from "@/images/img_default.png";

export default function BestProducts({ bestProducts }) {
  const [bestArticles, setBestArticles] = useState([]);

  useEffect(() => {
    const updateBestArticles = () => {
      const screenWidth = window.innerWidth;
      let maxArticles;

      if (screenWidth <= 743) {
        maxArticles = 1;
      } else if (screenWidth <= 1199) {
        maxArticles = 2;
      } else {
        maxArticles = 4;
      }

      const filteredProducts = Array.isArray(bestProducts)
        ? bestProducts.slice(0, maxArticles)
        : [];

      setBestArticles(filteredProducts);
    };

    updateBestArticles();

    const throttledUpdate = throttle(updateBestArticles, 200);
    window.addEventListener("resize", throttledUpdate);

    return () => {
      window.removeEventListener("resize", throttledUpdate);
    };
  }, [bestProducts]);

  return (
    <>
      <div className={styles.bestProductsContainer}>
        <div className={styles.bestProducts}>
          <p className={styles.bestProductsTitle}>베스트 상품</p>
          <div className={styles.productList}>
            {bestArticles.map((product) => (
              <div className="productItem" key={product.id}>
                <Link href={ROUTES.ITEMS_DETAIL(product.id)} passHref>
                  <Image
                    src={`${product.images[0]}` || img_default}
                    alt={product.name ?? "Product Image"}
                    width={282}
                    height={282}
                    className={styles.productImg}
                    priority
                  />
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>
                    {formatPrice(product.price)}원
                  </p>
                  <p className={styles.favoriteCount}>
                    ♡ {product.favoriteCount}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
