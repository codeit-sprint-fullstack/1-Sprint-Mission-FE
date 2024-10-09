import { useState, useCallback, useEffect } from "react";
import { fetchArticles } from "@/utils/articleApi";

export function useArticles(initialArticles, totalArticles, pageSize, router) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(articles.length < totalArticles);

  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const loadMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetchArticles({
        orderBy: sortOrder,
        keyword: keyword,
        page: nextPage,
        pageSize: pageSize,
      });

      const newArticles = response.list || [];
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage(nextPage);
      setHasMore(
        newArticles.length > 0 &&
          articles.length + newArticles.length < totalArticles
      );
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    hasMore,
    page,
    articles.length,
    totalArticles,
    pageSize,
    sortOrder,
    keyword,
  ]);

  useEffect(() => {
    const fetchInitialArticles = async () => {
      setLoading(true);
      try {
        const response = await fetchArticles({
          orderBy: sortOrder,
          keyword: keyword,
          page: 1,
          pageSize: pageSize,
        });
        setArticles(response.list || []);
        setPage(1);
        setHasMore(response.list.length < totalArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialArticles();
  }, [sortOrder, keyword, pageSize, totalArticles]);

  return {
    articles,
    loadMoreArticles,
    hasMore,
    loading,
    setKeyword,
    setSortOrder,
  };
}
