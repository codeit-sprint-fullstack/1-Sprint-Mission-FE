import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';
import ArticleList from '@/components/FreeBoard/ArticleList.js';
import BestArticleList from '@/components/FreeBoard/BestArticleList.js';
import FleaMarketArticleListHeard from '@/components/FleaMarket/FleaMarketArticleListHeard.js';
import {
  fetchFreeBoardArticlesApi,
  fetchFreeBoardBestArticlesApi,
} from '@/utils/api/articleApi.js';
import styles from '@/styles/FreeBoard.module.css';
import useArticles from '@/hooks/useArticles';

export const getServerSideProps = async (context) => {
  const {
    keyword = '',
    orderBy = 'recent',
    page = 1,
    category = 'fleamarket',
  } = context.query;

  try {
    const bestArticles = await fetchFreeBoardBestArticlesApi({ category });
    const articles = await fetchFreeBoardArticlesApi({
      keyword,
      orderBy,
      page,
      category,
    });

    return {
      props: {
        bestArticlesData: bestArticles.data,
        initialArticles: articles.data || [],
        initialCategory: 'fleamarket',
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      props: {
        bestArticlesData: [],
        initialArticles: [],
        initialCategory: 'fleamarket',
      },
    };
  }
};

export default function FleaMarket({
  bestArticlesData,
  initialArticles,
  initialCategory,
}) {
  const [orderBy, setOrderBy] = useState('recent');
  const router = useRouter();
  const { keyword } = router.query;

  const { articles, loading, hasMore, setPagesValue } = useArticles({
    initialArticles,
    orderBy,
    category: initialCategory,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        setPagesValue((prev) => prev + 1);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticlesData} />
        <FleaMarketArticleListHeard keyword={keyword} setOrderBy={setOrderBy} />
        <ArticleList articles={articles} />
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
