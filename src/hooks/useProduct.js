import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById, favoriteProduct, unfavoriteProduct, updateProduct } from '../api/productApi';

export const useProduct = (itemId) => {
  const queryClient = useQueryClient();

  // 상품 정보 가져오기
  const { data: productData, error: productError, isLoading } = useQuery({
    queryKey: ['product', itemId],
    queryFn: () => getProductById(itemId),
    enabled: !!itemId,  // itemId가 존재할 때만 실행
  });

  // 상품 수정
  const updateProductMutation = useMutation({
    mutationFn: (updatedData) => updateProduct(itemId, updatedData),  // 수정할 데이터를 보내서 상품 정보 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(['product', itemId]);  // 성공 시 데이터를 갱신
    },
  });

  // 좋아요 / 좋아요 취소
  const likeMutation = useMutation({
    mutationFn: (isLiked) => (isLiked ? unfavoriteProduct(itemId) : favoriteProduct(itemId)),  // 좋아요 여부에 따라 API 호출 변경
    onSuccess: () => {
      queryClient.invalidateQueries(['product', itemId]);  // 성공 시 데이터 갱신
    },
  });

  return {
    productData,
    productError,
    isLoading,
    updateProductMutation,
    likeMutation,
  };
};

