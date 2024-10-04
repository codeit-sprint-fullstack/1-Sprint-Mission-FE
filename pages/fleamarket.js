import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '@/components/FleaMarket/ProductList.js';
import BestProductList from '@/components/FleaMarket/BestProductList.js';
import ProductListHeader from '@/components/FleaMarket/ProductListHeader.js';
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

  const { articles, totalPages, isLoading, isError, error } = useGetArticleList(
    {
      page: currentPage,
      sort: orderBy,
      keyword,
    }
  );

  const { bestArticles } = useGetBestArticle();

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(articles);

  return (
    <>
      <div className={styles.body}>
        <BestProductList articles={bestArticles} />
        <ProductListHeader keyword={keyword} setOrderBy={setOrderBy} />
        <ProductList articles={articles} />
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
