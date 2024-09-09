import { useState, useCallback, useEffect } from "react";
import BestProduct from "@/components/BoardComponents/BestProduct";
import BoardList from "@/components/BoardComponents/BoardList";
import { fetchArticles, fetchBestArticles } from "@/utils/articleApi";
import styles from "@/styles/board.module.css";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const {
    sort = "createdAt",
    keyword = "",
    page = 1,
    size = 4,
  } = context.query;

  try {
    const articles = await fetchArticles({ sort, keyword, page, size });
    const bestArticles = await fetchBestArticles();
    return {
      props: {
        initialArticles: articles.data || [],
        totalArticles: articles.total || 0,
        bestArticles,
        initialPage: page,
        pageSize: size,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        initialArticles: [],
        totalArticles: 0,
        bestArticles: [],
        initialPage: 1,
        pageSize: size,
      },
    };
  }
}

export default function Board({
  initialArticles,
  bestArticles,
  totalArticles,
  initialPage,
  pageSize,
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(articles.length < totalArticles);
  const router = useRouter();

  const loadMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;
    try {
      const response = await fetchArticles({
        sort: router.query.sort || "createdAt",
        keyword: router.query.keyword || "",
        page: nextPage,
        size: pageSize,
      });

      const newArticles = response.data || [];
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage(nextPage);

      if (
        newArticles.length === 0 ||
        articles.length + newArticles.length >= totalArticles
      ) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    loading,
    hasMore,
    articles.length,
    totalArticles,
    pageSize,
    router.query,
  ]);

  useEffect(() => {
    const fetchUpdatedArticles = async () => {
      setLoading(true);
      try {
        const response = await fetchArticles({
          sort: router.query.sort || "createdAt",
          keyword: router.query.keyword || "",
          page: 1,
          size: pageSize,
        });

        setArticles(response.data || []);
        setPage(1);
        setHasMore(response.data.length < totalArticles);
      } catch (error) {
        console.error("Error fetching updated articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdatedArticles();
  }, [router.query, totalArticles, pageSize]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreArticles, hasMore, loading]);

  return (
    <div className={styles.bestContainer}>
      <BestProduct articles={bestArticles} />
      <BoardList articles={articles} />
      {loading && <div>로딩중...</div>}
    </div>
  );
}
