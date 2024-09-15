import { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleList from '@/components/FreeBoard/ArticleList.js';
import BestArticleList from '@/components/FreeBoard/BestArticleList.js';
import ArticleListHeard from '@/components/FreeBoard/ArticleListHeard.js';
import {
  fetchFreeBoardArticles,
  fetchFreeBoardBestArticles,
} from '@/utils/api/articleApi.js';
import styles from '@/styles/FreeBoard.module.css';
import useArticles from '@/hooks/useArticles';

export const getServerSideProps = async (context) => {
  const { keyword = '', orderBy = 'recent', page = 1 } = context.query;

  try {
    const bestArticles = await fetchFreeBoardBestArticles();
    const articles = await fetchFreeBoardArticles({
      keyword,
      orderBy,
      page,
    });

    return {
      props: {
        bestArticlesData: bestArticles.data,
        initialArticles: articles.data || [],
        articlesTotal: articles.total,
        articlesPages: articles.pages || 0,
        initialOrderBy: orderBy,
        initialKeyword: keyword,
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      props: {
        bestArticlesData: [],
        initialArticles: [],
        articlesTotal: 0,
        articlesPages: 0,
        initialOrderBy: 'recent',
        initialKeyword: '',
      },
    };
  }
};

export default function FreeBoardPage({ bestArticlesData, initialArticles }) {
  const [orderBy, setOrderBy] = useState('recent');
  const router = useRouter();
  const { keyword } = router.query;

  const { articles, loading } = useArticles({
    initialArticles,
    orderBy,
  });

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
