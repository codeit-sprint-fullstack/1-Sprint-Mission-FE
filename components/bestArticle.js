import styles from "@/styles/BestArticle.module.css";
import BestArticleCard from "./bestArticleCard";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

export default function BestArticle() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const res = await axios.get("/article");
      setArticles(res.data.slice(0, 3));
    }

    fetchArticles();
  }, []);

  return (
    <div className={styles.best_article}>
      <div className={styles.best_article_container}>
        <p className={styles.best_article_container_text}>베스트 게시글</p>
        <div className={styles.best_article_card_container}>
          {articles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
