import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchFreeBoardArticles } from '@/utils/api/articleApi.js';

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
      const { data, pages } = await fetchFreeBoardArticles({
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
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        setPagesValue((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  useEffect(() => {
    if (pagesValue > 0) {
      fetchArticles(pagesValue);
    }
  }, [pagesValue]);

  return { articles, loading };
}
