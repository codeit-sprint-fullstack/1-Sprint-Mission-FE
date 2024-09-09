import ArticleList from '@/components/FreeBoard/ArticleList';
import SearchForm from '@/components/FreeBoard/SearchForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Search.module.css';

export default function Search() {
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  const { keyword } = router.query;

  async function getArticles() {
    try {
      const res = await axios.get(
        `https://sprint-be-h8kw.onrender.com/articles/freeboard?keyword=${keyword}`
      );
      const nextArticle = res.data;
      setArticles(nextArticle);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    getArticles(keyword);
  }, [keyword]);

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.mainText}>서치페이지</div>
        <SearchForm className={styles.input} initialValue={keyword} />

        {articles.length >= 1 ? (
          <ArticleList articles={articles} />
        ) : (
          <>
            <div className={styles.noResultsHeading}>앗!</div>
            <span className={styles.noResultsMessage}>
              <span className={styles.noResultsKeyword}>'{keyword}'</span> 검색
              결과가 없어요
            </span>
          </>
        )}
      </div>
    </>
  );
}
