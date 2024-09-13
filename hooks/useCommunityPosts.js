import { useState, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchPosts } from "@/utils/communityAPI";

export const useCommunityPosts = () => {
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 0 }) => fetchPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: 60000,
      retry: 3,
    }
  );

  const posts = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.posts) : [];
  }, [data]);

  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];

    let result = posts;

    if (search) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sort === "likes") {
        return b.likes - a.likes;
      }
      return 0;
    });

    return result;
  }, [posts, sort, search]);

  return {
    posts,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    search,
    setSearch,
    filteredAndSortedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
