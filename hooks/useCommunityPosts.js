import { useState, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchPosts } from "@/utils/communityAPI";

export const useCommunityPosts = () => {
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  const fetchPostsWithParams = useCallback(
    ({ pageParam = 0 }) => {
      return fetchPosts(pageParam, sort, search);
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
  } = useInfiniteQuery(["posts", sort, search], fetchPostsWithParams, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    staleTime: 60000,
    retry: 3,
  });

  const posts = data ? data.pages.flatMap((page) => page.posts) : [];

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
    posts,
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
