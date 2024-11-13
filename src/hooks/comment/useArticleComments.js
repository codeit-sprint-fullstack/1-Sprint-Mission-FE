import { useQuery } from '@tanstack/react-query';
import { getComment } from '@utils/api/api';
import { QUERY_KEYS } from '../Constant/queryKeys';

export const useArticleComments = ({ id, initialData }) => {
  const {
    data: articleComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.ARTICLE_COMMENTS, id],
    queryFn: async () => getComment(id),
    initialData: initialData,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 2000,
  });

  return { articleComments, isLoading, error };
};
