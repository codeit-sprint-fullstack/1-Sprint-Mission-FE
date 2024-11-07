import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById, favoriteProduct, unfavoriteProduct, updateProduct } from "../api/productApi";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: string[];
  likes?: number;
  isFavorite?: boolean;
  tags?: string[];
  userId?: number;
}

interface ProductResponse {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
  image?: string | string[];
  likes?: number;
  userId?: number;
}

interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  tags?: string[];
  likes?: number;
  isFavorite?: boolean;
  userId?: number;
}

export const useProduct = (itemId: number) => {
  const queryClient = useQueryClient();

  // 상품 정보 가져오기
  const { data: productData, error: productError, isLoading } = useQuery<Product, Error>({
    queryKey: ["product", itemId],
    queryFn: async () => {
      const response: ProductResponse = await getProductById(itemId);

      // Product 타입으로 변환
      return {
        id: response.id,
        name: response.name ?? "이름이 없는 전설의 상품",
        description: response.description ?? "이 상품은 이름이 없는 전설의 상품입니다.",
        price: response.price ?? 0,
        images: Array.isArray(response.image) ? response.image : [response.image ?? ""],
        likes: response.likes ?? 0,
        tags: response.tags ?? ["데이터가 없다니... 이런"],
        userId: response.userId,
      };
    },
    enabled: !!itemId,
  });

  // 상품 수정
  const updateProductMutation = useMutation({
    mutationFn: (updatedData: UpdateProductData) => updateProduct(itemId, updatedData),
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
