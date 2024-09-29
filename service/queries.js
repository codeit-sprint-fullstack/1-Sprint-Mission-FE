import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "@/variables/queryKeys";
import { READ_ONE, READ_ALL } from "@/variables/entities";

export function useGetBestList(entity, params = {}) {
  const { queryKey, read: axiosFunction } = READ_ALL(entity);
  return useQuery({
    queryKey: queryKey(params),
    queryFn: () => axiosFunction(params),
  });
}

export function useGetList(entity, { orderBy, keyword }) {
  const { queryKey, read: axiosFunction } = READ_ALL(entity);

  return useInfiniteQuery({
    queryKey: queryKey({ orderBy, keyword }),
    queryFn: ({ pageParam = 1 }) =>
      axiosFunction({
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

export function useGetCommentList({ idPath, whichComment }) {
  const { queryKey, readComments: axiosFunction } = READ_ALL(whichComment);

  return useInfiniteQuery({
    queryKey: queryKey(idPath),
    queryFn: ({ pageParam = null }) => {
      return axiosFunction(idPath, { cursor: pageParam });
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

export function useGetById({ entity, id }) {
  const { queryKey, read: axiosFunction } = READ_ONE(entity);

  return useQuery({
    queryKey: queryKey(id),
    queryFn: () => axiosFunction(id),
    enabled: !!id,
  });
}
