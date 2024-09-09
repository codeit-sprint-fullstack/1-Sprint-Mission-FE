import ArticleList from '@/components/FreeBoard/ArticleList.js';
import BestArticleList from '@/components/FreeBoard/BestArticleList.js';
import ArticleListHeard from '@/components/FreeBoard/ArticleListHeard.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/FreeBoard.module.css';

export default function FreeBoard() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  async function getArticles() {
    try {
      const res = await axios.get(
        'https://sprint-be-h8kw.onrender.com/articles/freeboard?orderBy=recent'
      );
      const nextArticles = res.data;
      setArticles(nextArticles);
      setBestArticles(nextArticles.slice(0, 3));
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />
        <ArticleListHeard />
        <ArticleList articles={articles} />
      </div>
    </>
  );
}
