import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleList from '@/components/FreeBoard/ArticleList.js';
import BestArticleList from '@/components/FreeBoard/BestArticleList.js';
import ArticleListHeard from '@/components/FreeBoard/ArticleListHeard.js';
import {
  fetchFreeBoardArticles,
  fetchFreeBoardBestArticles,
} from '@/utils/api/articleApi.js';
import styles from '@/styles/FreeBoard.module.css';

export default function FreeBoardPage() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [pagesValue, setPagesValue] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { keyword } = router.query;

  const fetchArticles = async (page) => {
    setLoading(true);
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
  };

  const getBestArticles = async () => {
    const { data } = await fetchFreeBoardBestArticles();
    setBestArticles(data);
  };

  useEffect(() => {
    getBestArticles();
    fetchArticles();
  }, []);

  useEffect(() => {
    setPagesValue(1);
    setArticles([]);
    setHasMore(true);
    fetchArticles(1);
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

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />
        <ArticleListHeard keyword={keyword} setOrderBy={setOrderBy} />
        <ArticleList articles={articles} />
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
