import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getArticleList, getArticleComments } from "./api";
import { articleKey, productKey } from "@/variables/queryKeys";

export function useBestArticles(params = {}) {
  return useQuery({
    queryKey: articleKey.list(params),
    queryFn: () => getArticleList(params),
  });
}

export function useCommentList({ idPath, whichId }) {
  const queryKey =
    whichId === "article"
      ? articleKey.comments(idPath)
      : productKey.comments(idPath);

  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ queryKey, pageParam = null }) => {
      const idPath = queryKey[2];
      return getArticleComments(idPath, { cursor: pageParam });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!idPath,
  });
}
