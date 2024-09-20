import { useState, useCallback, useEffect } from "react";
import { fetchArticles } from "@/utils/articleApi";

export function useArticles(initialArticles, totalArticles, pageSize, router) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(articles.length < totalArticles);

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

  return { articles, loadMoreArticles, hasMore, loading };
}
