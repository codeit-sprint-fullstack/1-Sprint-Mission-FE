import ArticleList from '@/components/ArticleList';
import SearchForm from '@/components/SearchForm';
import axios from '@/lib/axios.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Search.module.css';

import mock from '@/lib/mock.js';

export default function Search() {
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  const { keyword } = router.query;

  // async function getArticles(query) {
  //   const res = await axios.get(`/articles/?keyword=${query}`);
  //   const nextArticles = res.data.results;
  //   setArticles(setArticles);
  // }

  // function getArticles(query) {
  //   const res = await axios.get(`/articles/?keyword=${query}`);
  //   const nextArticles = res.data.results;
  //   setArticles(setArticles);
  // }

  // useEffect(() => {
  //   getArticles(keyword);
  // }, [keyword]);

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
