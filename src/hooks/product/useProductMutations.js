import { QUERY_KEYS } from '@hooks/Constant/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getProductList, getProductTotalCount } from '@utils/api/product';

export const useProductList = (params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_LIST, params.search, params.offset],
    queryFn: async () => getProductList(params),
    keepPreviousData: true,
    retry: 3,
    retryDelay: 2000,
  });

  return { data, isLoading, error };
};

export const useProductTotalCount = (params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_TOTAL_COUNT, params.search],
    queryFn: async () => getProductTotalCount(params),
    keepPreviousData: true,
    retry: 3,
    retryDelay: 2000,
  });

  return { data, isLoading, error };
};
