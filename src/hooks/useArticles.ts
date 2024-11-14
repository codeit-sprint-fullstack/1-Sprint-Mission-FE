import { useState, useCallback, useEffect } from "react";
import { fetchArticles } from "@/utils/articleApi";
import { Article } from "@/types/Types";

interface FetchArticlesResponse {
  list: Article[];
  totalCount: number;
}

export function useArticles(
  initialArticles: Article[],
  totalArticles: number,
  pageSize: number,
  router: any // NextRouter를 사용할 수 있다면 NextRouter로 지정
) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(
    initialArticles.length < totalArticles
  );

  const [keyword, setKeyword] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("recent");

  const loadMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response: FetchArticlesResponse = await fetchArticles({
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
        const response: FetchArticlesResponse = await fetchArticles({
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
