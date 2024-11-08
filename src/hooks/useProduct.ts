import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById, favoriteProduct, unfavoriteProduct, updateProduct, ProductResponse } from "../api/productApi";

export const useProduct = (itemId: number) => {
  const queryClient = useQueryClient();

  // 상품 정보 가져오기
  const { data: productData, error: productError, isLoading } = useQuery<ProductResponse, Error>({
    queryKey: ["product", itemId],
    queryFn: async () => {
      const response: ProductResponse = await getProductById(itemId);

      return {
        ...response,
        name: response.name ?? "이름 데이터가 없는 전설의 상품",
        description: response.description ?? "이 상품은 상품에 대한 설명 데이터가 없는 전설의 상품입니다.",
        price: response.price ?? 0,
        image: Array.isArray(response.images) ? response.images : [response.images ?? ""],
        likes: response.likes ?? 0,
        tags: response.tags ?? ["태그 데이터가 없다니... 이런"],
      };
    },
    enabled: !!itemId,
  });

  // 상품 수정
  const updateProductMutation = useMutation({
    mutationFn: (updatedData: ProductResponse) => updateProduct(itemId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", itemId] });
    },
  });

  // 좋아요 / 좋아요 취소
  const likeMutation = useMutation({
    mutationFn: (isLiked: boolean) => (isLiked ? unfavoriteProduct(itemId) : favoriteProduct(itemId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", itemId] });
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

