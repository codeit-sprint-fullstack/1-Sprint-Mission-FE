import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';
import ArticleList from '@/components/FleaMarket/ArticleList.js';
import BestArticleList from '@/components/FleaMarket/BestArticleList.js';
import ArticleListHeader from '@/components/FleaMarket/ArticleListHeader.js';

import {
  fetchFleaMarketBestApi,
  fetchFleaMarketApi,
} from '@/utils/api/fleaMarketApi';
import styles from '@/styles/FreeBoard.module.css';
import {
  useFleaMarketArticlesList,
  useGetBestArticle,
} from '@/hooks/useFleaMarket';

export const getServerSideProps = async (context) => {
  const { keyword = '', sort = 'recent', page = 1 } = context.query;

  try {
    const articles = await fetchFleaMarketApi({
      keyword,
      sort,
      page,
    });

    return {
      props: {
        initialArticles: articles.data || [],
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      props: {
        initialArticles: [],
      },
    };
  }
};

export default function FleaMarket() {
  const [orderBy, setOrderBy] = useState('recent');
  const router = useRouter();
  const { keyword } = router.query;

  const { articles, loading, hasMore, fetchNextPage } =
    useFleaMarketArticlesList({
      orderBy,
      limit: 5,
    });

  const { bestArticles } = useGetBestArticle();

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />
        <ArticleListHeader keyword={keyword} setOrderBy={setOrderBy} />
        <ArticleList articles={articles} />
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
