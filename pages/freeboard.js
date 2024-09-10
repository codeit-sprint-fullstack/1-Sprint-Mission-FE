import ArticleList from '@/components/FreeBoard/ArticleList.js';
import BestArticleList from '@/components/FreeBoard/BestArticleList.js';
import ArticleListHeard from '@/components/FreeBoard/ArticleListHeard.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/styles/FreeBoard.module.css';

export default function FreeBoard() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const router = useRouter();

  const { keyword } = router.query;

  async function getArticles() {
    try {
      const res = await axios.get(
        `https://sprint-be-h8kw.onrender.com/articles/freeboard`,
        {
          params: { keyword, orderBy },
        }
      );
      const nextArticles = res.data;
      setArticles(nextArticles);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function getBestArticles() {
    try {
      const res = await axios.get(
        `https://sprint-be-h8kw.onrender.com/articles/freeboard`,
        {
          params: { orderBy },
        }
      );
      const nextArticles = res.data;
      setBestArticles(nextArticles.slice(0, 3));
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    getBestArticles();
    getArticles();
  }, [keyword]);

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />

        <ArticleListHeard keyword={keyword} />

        <ArticleList articles={articles} />
      </div>
    </>
  );
}
