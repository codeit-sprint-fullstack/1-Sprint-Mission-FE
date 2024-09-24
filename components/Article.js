import Link from "next/link";
import styles from "./Article.module.css";
import ArticleList from "./ArticleList";
import Search from "./Search";
import DropDown from "./DropDown";
import { useState } from "react";

export default function Article({ articles }) {
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // 검색 기능 구현(자세하게 알아놓기)
  const handleSearch = (keyword) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className={styles.article}>
      <div className={styles.container}>
        <div className={styles.title}>게시글</div>
        <Link href={"/post"}>
          <button className={styles.button}>글쓰기</button>
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <Search onSearch={handleSearch} />
        <DropDown />
      </div>
      <div>
        <ArticleList articles={filteredArticles} />
      </div>
    </div>
  );
}
