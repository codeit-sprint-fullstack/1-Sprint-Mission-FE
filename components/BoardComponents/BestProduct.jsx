import { useState, useEffect } from "react";
import styles from "./BestProduct.module.css";
import Image from "next/image";
import ProductImg from "@/images/product.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { throttle } from "@/utils/throttle";

export default function BestProduct({ articles }) {
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
        maxArticles = 3;
      }

      const filteredArticles = Array.isArray(articles.list)
        ? articles.list.slice(0, maxArticles)
        : [];
      setBestArticles(filteredArticles);
    };

    updateBestArticles();

    const throttledUpdate = throttle(updateBestArticles, 200);
    window.addEventListener("resize", throttledUpdate);

    return () => {
      window.removeEventListener("resize", throttledUpdate);
    };
  }, [articles]);

  return (
    <div className={styles.bestProducts}>
      <h3>베스트 게시글</h3>
      <div className={styles.product}>
        {bestArticles.length > 0 ? (
          bestArticles.map((article) => (
            <div className={styles.productItem} key={article.id}>
              <Link href={ROUTES.ARTICLE(article.id)} passHref>
                <div className={styles.badge}>Best</div>
                <div className={styles.titleContainer}>
                  <p className={styles.title}>{article.title}</p>
                  <div className={styles.productImgContainer}>
                    <Image
                      src={
                        article.images.length > 0
                          ? article.images[0]
                          : ProductImg
                      }
                      alt="product"
                      className={styles.productImg}
                      width={48}
                      height={48}
                    />
                  </div>
                </div>
                <div className={styles.info}>
                  <p className={styles.user}>
                    {article.writer.nickname} ♡ {article.likeCount}
                  </p>
                  <p className={styles.date}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No best articles available.</p>
        )}
      </div>
    </div>
  );
}
