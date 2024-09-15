import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ArticleList from '@/components/FreeBoard/ArticleList.js';
import BestArticleList from '@/components/FreeBoard/BestArticleList.js';
import ArticleListHeard from '@/components/FreeBoard/ArticleListHeard.js';
import {
  fetchFreeBoardArticlesApi,
  fetchFreeBoardBestArticlesApi,
} from '@/utils/api/articleApi.js';
import styles from '@/styles/FreeBoard.module.css';
import useArticles from '@/hooks/useArticles';

export const getServerSideProps = async (context) => {
  const { keyword = '', orderBy = 'recent', page = 1 } = context.query;

  try {
    const bestArticles = await fetchFreeBoardBestArticlesApi();
    const articles = await fetchFreeBoardArticlesApi({
      keyword,
      orderBy,
      page,
    });

    return {
      props: {
        bestArticlesData: bestArticles.data,
        initialArticles: articles.data || [],
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      props: {
        bestArticlesData: [],
        initialArticles: [],
      },
    };
  }
};

export default function FreeBoardPage({ bestArticlesData, initialArticles }) {
  const [orderBy, setOrderBy] = useState('recent');
  const router = useRouter();
  const { keyword } = router.query;

  const { articles, loading, hasMore, setPagesValue } = useArticles({
    initialArticles,
    orderBy,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      console.log(window);
      if (scrollPosition >= documentHeight - 100) {
        setPagesValue((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticlesData} />
        <ArticleListHeard keyword={keyword} setOrderBy={setOrderBy} />
        <ArticleList articles={articles} />
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
