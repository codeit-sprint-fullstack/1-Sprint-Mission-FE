import ArticleList from '@/components/FreeBoard/ArticleList';
import SearchForm from '@/components/FreeBoard/SearchForm';
import axios from '@/lib/axios.js';
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
        `https://sprint-be-h8kw.onrender.com/articles?keyword=${keyword}`
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
        <h1>서치페이지</h1>
        <SearchForm initialValue={keyword} />
        <h1> 검색어는 {keyword} 입니다.</h1>
        <ArticleList articles={articles} />
      </div>
    </>
  );
}
