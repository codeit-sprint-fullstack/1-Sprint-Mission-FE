import { useState, useEffect } from "react";
import axios from "@/lib/axios.js";
import BestArticleCard from "./BestArticleCard";
import styles from "./BestArticleList.module.css";

export default function BestArticleList() {
  const [bestArticles, setBestArticles] = useState([]);

  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        const response = await axios.get("/article");
        // 상위 3개의 게시글을 베스트 게시글로 설정
        setBestArticles(response.data.slice(0, 3));
      } catch (error) {
        console.error("게시글을 가져오는 중 오류 발생:", error);
      }
    };

    fetchBestArticles();
  }, []);

  return (
    <div className={styles.bestArticleSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>베스트 게시글</h2>
        <div className={styles.cardContainer}>
          {bestArticles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
