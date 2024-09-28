import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';
import ArticleList from '@/components/FleaMarket/ArticleList.js';
import BestArticleList from '@/components/FleaMarket/BestArticleList.js';
import ArticleListHeader from '@/components/FleaMarket/ArticleListHeader.js';
import { fetchFleaMarketApi } from '@/utils/api/fleaMarketApi';
import styles from '@/styles/FreeBoard.module.css';
import { useGetArticleList, useGetBestArticle } from '@/hooks/useFleaMarket';
import Pagination from '@/components/FleaMarket/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const { keyword } = router.query;

  const { articles, totalPages, isLoading } = useGetArticleList({
    page: currentPage,
    sort: orderBy,
    keyword,
  });

  const { bestArticles } = useGetBestArticle();

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />
        <ArticleListHeader keyword={keyword} setOrderBy={setOrderBy} />
        <ArticleList articles={articles} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
}
