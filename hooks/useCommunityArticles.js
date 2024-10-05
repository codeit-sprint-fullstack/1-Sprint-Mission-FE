import { useState, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchArticles } from "@/utils/communityAPI";

export const useCommunityArticles = () => {
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  const fetchArticlesWithParams = useCallback(
    ({ pageParam = 0 }) => {
      return fetchArticles(pageParam, sort, search);
    },
    [sort, search]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["Articles", sort, search], fetchArticlesWithParams, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000,
    retry: 3,
  });

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  console.log("받은거:", data);
  console.log("처리한거:", articles);

  const handleSortChange = useCallback((newSort) => {
    setSort(newSort);
  }, []);

  const handleSearchChange = useCallback((newSearch) => {
    setSearch(newSearch);
  }, []);

  useEffect(() => {
    refetch();
  }, [sort, search, refetch]);

  return {
    articles,
    isLoading,
    isError,
    error,
    sort,
    setSort: handleSortChange,
    search,
    setSearch: handleSearchChange,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
