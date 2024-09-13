// components/BestArticles.js
import { useEffect, useState } from "react";
import { getBestArticles } from "../pages/api/articles";

const BestArticles = () => {
  const [bestArticles, setBestArticles] = useState([]);

  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        const data = await getBestArticles();
        setBestArticles(data);
      } catch (error) {
        console.error("Failed to fetch best articles:", error);
      }
    };

    fetchBestArticles();
  }, []);

  return (
    <div className="best-articles">
      <h1>베스트 게시글</h1>
      <div className="articles-list">
        {bestArticles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestArticles;
