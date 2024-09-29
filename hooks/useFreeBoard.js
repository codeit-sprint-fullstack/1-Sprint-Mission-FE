import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  fetchFreeBoardApi,
  fetchFreeBoardBestApi,
  fetchFreeBoardArticleApi,
  postFreeBoardArticleApi,
  editArticleApi,
  deleteArticleApi,
} from '@/utils/api/freeBoardApi';

export function useGetBestArticle() {
  const { isLoading, data } = useQuery({
    queryKey: ['bestArticle'],
    queryFn: () => fetchFreeBoardBestApi(),
    refetchInterval: 300000,
  });

  return { bestArticles: data, isLoading };
}

export function useFreeBoardArticlesList({ orderBy, limit }) {
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { keyword } = router.query;

  const { data, fetchNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['articles', orderBy, keyword, limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchFreeBoardApi({ sort: orderBy, keyword, page: pageParam, limit }),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    refetchInterval: 300000,
  });

  const uniqueArticles = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.data)
        .map((article) => [article.id, article])
    ).values() || []
  );

  const totalPages = data?.pages[0].totalPages;

  useEffect(() => {
    if (totalPages - data?.pages.length <= 0) {
      setHasMore(false);
    }
  }, [data]);

  return {
    articles: uniqueArticles,
    loading: isLoading,
    hasMore,
    isError,
    error,
    fetchNextPage,
  };
}

export function useGetArticle(id) {
  const { isLoading, data } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchFreeBoardArticleApi(id),
    enabled: !!id,
  });

  return { data, isLoading };
}

export function useEditArticle({ id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postFreeBoardArticle = useMutation({
    mutationFn: ({ title, content, userId }) =>
      postFreeBoardArticleApi({ title, content, userId }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      router.push(`/freeboard/${newArticle.id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const editFreeBoardArticle = useMutation({
    mutationFn: ({ id, title, content }) =>
      editArticleApi({ id, title, content }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      queryClient.invalidateQueries(['article', newArticle.id]);
      queryClient.invalidateQueries(['bestArticle']);
      router.push(`/freeboard/${id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFreeBoardArticle = useMutation({
    mutationFn: (id) => deleteArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      queryClient.invalidateQueries(['bestArticle']);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const postComment = (newArticle) => {
    postFreeBoardArticle.mutate(newArticle);
  };

  const deleteArticle = (id) => {
    deleteFreeBoardArticle.mutate(id);
  };

  return { editFreeBoardArticle, deleteArticle, postComment };
}
