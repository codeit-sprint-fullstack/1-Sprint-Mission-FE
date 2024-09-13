// components/ArticleList.js
import { useEffect, useState } from "react";
import { getArticles } from "../pages/api/articles";
import SearchForm from "./SearchForm";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles({
          orderBy: sortOrder,
          search: searchTerm,
        });
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, [sortOrder, searchTerm]);

  return (
    <div className="article-section">
      <SearchForm onSearch={(value) => setSearchTerm(value)} />

      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="latest">최신 순</option>
        <option value="favorite">좋아요 순</option>
      </select>

      <div className="articles">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <h4>{article.title}</h4>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
