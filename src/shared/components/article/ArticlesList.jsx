'use client';
import { getArticleList } from '@utils/api/api';
import ArticleTemplate from './ArticleTemplate';
import { useEffect, useState } from 'react';
import SortDropdown from '@shared/components/dropdowns/SortDropdown';
import SearchInput from '@shared/components/inputs/SearchInput';
import styles from '@shared/components/article/ArticlesList.module.css';

export default function ArticlesList({ article }) {
  const [searchArticles, setSearchArticles] = useState(article);
  const [searchQuery, setSearchQuery] = useState('');

  const getSearchArticle = async () => {
    const query = { orderBy: 'recent', limit: 5, search: searchQuery };
    const response = await getArticleList(query);
    setSearchArticles(response);
  };

  useEffect(() => {
    getSearchArticle();
  }, [searchQuery]);

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
      {searchArticles.map((article) => {
        return <ArticleTemplate article={article} isBest={false} />;
      })}
    </>
  );
}
