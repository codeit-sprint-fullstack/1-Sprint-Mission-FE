import { useRouter } from 'next/router';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    refetchInterval: 300000,
  });

  return { bestArticles: data, isLoading };
}

export function useGetArticleList({ page, sort, keyword }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['article', page, sort, keyword],
    queryFn: () => fetchFleaMarketApi({ page, sort, keyword }),
    refetchInterval: 300000,
  });

  const totalPages = data?.totalPages;
  const articles = data?.data;

  return {
    articles,
    totalPages,
    isLoading,
    isError,
    error,
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
