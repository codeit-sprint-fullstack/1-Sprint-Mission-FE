import SearchForm from '@/components/SearchForm.js';
import ArticleList from '@/components/ArticleList.js';
import BestArticleList from '@/components/BestArticleList.js';
import postBtn from '@/public/post_btn.png';
import arrowDown from '@/public/ic_arrow_down.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import mock from '@/lib/mock.js';
import Image from 'next/image';

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
        <div className={styles.listHeader}>
          <span className={styles.title}>게시글</span>
          <Link href='/freeboard/post'>
            <Image src={postBtn} alt='글쓰기 버튼' />
          </Link>
        </div>
        <div className={styles.menu}>
          <SearchForm />
          <div className={styles.dropDown}>
            <div className={styles.dropDownText}>최신순</div>
            <Image src={arrowDown} alt='아래 화살표' className={styles.dropDownArrow}/>
          </div>
        </div>
        <ArticleList articles={articles} />
      </div>
    </>
  );
}
