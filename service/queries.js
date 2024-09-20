import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getArticleList, getArticleComments } from "./api/article";
import { articleKey, PAGE_SIZE, productKey } from "@/variables/queryKeys";

export function useGetBestArticles(params = {}) {
  return useQuery({
    queryKey: articleKey.list(params),
    queryFn: () => getArticleList(params),
  });
}

export function useGetCommentList({ idPath, whichId }) {
  const queryKey =
    whichId === "article" ? articleKey.comments : productKey.comments;

  return useInfiniteQuery({
    queryKey: queryKey(idPath),
    queryFn: ({ queryKey, pageParam = null }) => {
      const idPath = queryKey[2];
      return getArticleComments(idPath, { cursor: pageParam });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    keepPreviousData: true,
    enabled: !!idPath,
  });
}

export function useGetArticleList({ orderBy, keyword }) {
  return useInfiniteQuery({
    queryKey: articleKey.list({ orderBy, keyword }),
    queryFn: ({ pageParam = 1 }) =>
      getArticleList({
        keyword,
        orderBy,
        page: pageParam,
        pageSize: PAGE_SIZE.DEFAULT,
      }),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.list.length < PAGE_SIZE.DEFAULT) {
        return undefined;
      }
      return allPages.length + 1;
    },
    keepPreviousData: true,
  });
}
