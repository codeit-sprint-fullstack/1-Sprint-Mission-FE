import SearchForm from '@/components/SearchForm.js';
import ArticleList from '@/components/ArticleList.js';
import BestArticleList from '@/components/BestArticleList.js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import mock from '@/lib/mock.js';

import styles from '@/styles/FreeBoard.module.css';

export default function FreeBoard() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  // async function getArticles() {
  //   const res = await axios.get('/articles');
  //   const nextArticles = res.data.result;
  //   setArticles(nextArticles);
  // }

  async function getBestArticles() {
    const nextArticles = mock.slice(0, 3);
    setBestArticles(nextArticles);
  }

  async function getArticles() {
    const nextArticles = mock;
    setArticles(nextArticles);
  }

  useEffect(() => {
    getBestArticles();
    getArticles();
  }, []);

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />
        <h1>게시글</h1>
        <Link href='/freeboard/post'>
          <button>글쓰기</button>
        </Link>
        <SearchForm />
        <ArticleList articles={articles} />
      </div>
    </>
  );
}
