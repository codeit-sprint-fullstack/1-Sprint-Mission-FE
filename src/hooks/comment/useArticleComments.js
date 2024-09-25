import { useQuery } from '@tanstack/react-query';
import { getComment } from '@utils/api/api';

export const useArticleComments = ({ id, initialData }) => {
  const {
    data: articleComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articleComments', id],
    queryFn: async () => getComment(id),
    initialData: initialData,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 2000,
  });

  return { articleComments, isLoading, error };
};
