import styles from "@/styles/BestArticle.module.css";
import BestArticleCard from "./bestArticleCard";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

export default function BestArticle() {
  const [articles, setArticles] = useState([]);

  return (
    <div className={styles.bestArticle}>
      <div className={styles.bestArticleContainer}>
        <p className={styles.bestArticleContainerText}>베스트 게시글</p>
        <div className={styles.bestArticleContainerText}>
          {articles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
