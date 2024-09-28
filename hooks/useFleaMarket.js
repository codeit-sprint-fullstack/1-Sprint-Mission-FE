import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  fetchFleaMarketApi,
  fetchFleaMarketBestApi,
  fetchFleaMarketArticleApi,
  postFleaMarketArticleApi,
  editFleaMarketArticleApi,
  deleteFleaMarketArticleApi,
} from '@/utils/api/fleaMarketApi';

export function useGetBestArticle() {
  const { isLoading, data } = useQuery({
    queryKey: ['bestArticle'],
    queryFn: () => fetchFleaMarketBestApi(),
  });

  return { bestArticles: data, isLoading };
}

// export function useFleaMarketArticlesList({ orderBy, limit }) {
//   const [hasMore, setHasMore] = useState(true);
//   const router = useRouter();
//   const { keyword } = router.query;

//   const { data, fetchNextPage, isLoading } = useInfiniteQuery({
//     queryKey: ['articles', keyword],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchFleaMarketApi({ sort: orderBy, keyword, page: pageParam, limit }),
//     getNextPageParam: (lastPage, pages) => {
//       const nextPage = pages.length + 1;
//       return nextPage <= lastPage.totalPages ? nextPage : undefined;
//     },
//   });

//   const uniqueArticles = Array.from(
//     new Map(
//       data?.pages
//         .flatMap((page) => page.data)
//         .map((article) => [article.id, article])
//     ).values() || []
//   );

//   const totalPages = data?.pages[0].totalPages;

//   useEffect(() => {
//     if (totalPages - data?.pages.length <= 0) {
//       setHasMore(false);
//     }
//   }, [data]);

//   return {
//     articles: uniqueArticles,
//     loading: isLoading,
//     totalPages,
//     hasMore,
//     fetchNextPage,
//   };
// }

export function useGetArticleList({ page, sort, keyword }) {
  const { data, fetchNextPage, isLoading } = useQuery({
    queryKey: ['article', page, sort, keyword],
    queryFn: () => fetchFleaMarketApi({ page, sort, keyword }),
  });

  const totalPages = data?.totalPages;
  const articles = data?.data;

  // console.log(data.data);

  return {
    articles,
    totalPages,
    isLoading,
  };
}

export function useGetArticle(id) {
  const { isLoading, data } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchFleaMarketArticleApi(id),
    enabled: !!id,
  });

  return { data, isLoading };
}

export function useFleaMarketEditArticle({ id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const editFleaMarketArticle = useMutation({
    mutationFn: ({ id, title, content }) =>
      editFleaMarketArticleApi({ id, title, content }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      queryClient.invalidateQueries(['article', newArticle.id]);
      queryClient.invalidateQueries(['bestArticle']);
      router.push(`/fleamarket/${id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFleaMarketArticle = useMutation({
    mutationFn: (id) => deleteFleaMarketArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['bestArticle']);
    },

    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFleaMArketArticle = (id) => {
    deleteFleaMarketArticle.mutate(id);
  };

  return { editFleaMarketArticle, deleteFleaMArketArticle };
}

export function useFleaMarketPostArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postFleaMarketArticle = useMutation({
    mutationFn: ({ title, content, price, image, tags, userId }) =>
      postFleaMarketArticleApi({ title, content, price, image, tags, userId }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      queryClient.invalidateQueries(['bestArticle']);
      router.push(`/fleamarket/${newArticle.id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const postArticle = (newArticle) => {
    postFleaMarketArticle.mutate(newArticle);
  };

  return { postArticle };
}
