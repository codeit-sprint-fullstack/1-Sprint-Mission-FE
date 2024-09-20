'use client';
import { getArticleList } from '@utils/api/api';
import ArticleTemplate from './ArticleTemplate';
import { useState } from 'react';
import SortDropdown from '@shared/components/dropdowns/SortDropdown';
import SearchInput from '@shared/components/inputs/SearchInput';
import styles from '@shared/components/article/ArticlesList.module.css';
import { useQuery } from '@tanstack/react-query';

export default function GeneralArticles({ article }) {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: searchArticles = article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['searchArticles', searchQuery],
    queryFn: () =>
      getArticleList({ orderBy: 'recent', limit: 5, search: searchQuery }),
    keepPreviousData: true,
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className={styles['options-container']}>
        <SearchInput
          placeholder={'검색할 상품을 입력해주세요'}
          onChange={handleSearchChange}
        />
        <SortDropdown option={'최신순'} />
      </div>
      {isLoading && <>로딩중입니다.</>}
      {error && <>데이터를 불러오지 못했습니다.</>}
      {!isLoading &&
        !error &&
        searchArticles.map((article) => {
          return <ArticleTemplate article={article} isBest={false} />;
        })}
    </>
  );
}
