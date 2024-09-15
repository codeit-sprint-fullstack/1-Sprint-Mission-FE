import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchFreeBoardArticlesApi } from '@/utils/api/articleApi.js';

export default function useArticles({ orderBy, initialArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [pagesValue, setPagesValue] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { keyword } = router.query;

  const fetchArticles = async (page) => {
    setLoading(true);
    try {
      const { data, pages } = await fetchFreeBoardArticlesApi({
        keyword,
        orderBy,
        page,
      });

      setLoading(false);

      setArticles((prevArticles) => {
        const mergedItems = [...prevArticles, ...data];
        const uniqueArticles = Array.from(
          new Map(mergedItems.map((item) => [item.id, item])).values()
        );
        return uniqueArticles;
      });

      if (page >= pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setHasMore(true);
    fetchArticles(1);
    setPagesValue(1);
  }, [keyword, orderBy]);

  useEffect(() => {
    if (pagesValue > 0) {
      fetchArticles(pagesValue);
    }
  }, [pagesValue]);

  return { articles, loading, hasMore, setPagesValue };
}
