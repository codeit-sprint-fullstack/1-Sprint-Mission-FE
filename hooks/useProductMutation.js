import { useMutation, useQueryClient } from "react-query";
import {
  updateProduct,
  deleteProduct,
  toggleFavorite,
} from "@/utils/productAPI";
import { useRouter } from "next/router";

export const useProductMutations = (cleanItemId, showModal) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 상품 수정
  const updateMutation = useMutation(
    (updatedProduct) => updateProduct(cleanItemId, updatedProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["product", cleanItemId]);
      },
    }
  );

  // 상품 삭제
  const deleteMutation = useMutation(() => deleteProduct(cleanItemId), {
    onSuccess: () => {
      router.push("/items");
    },
  });

  // 찜하기 토글
  const favoriteMutation = useMutation(() => toggleFavorite(cleanItemId), {
    onSuccess: (data) => {
      queryClient.setQueryData(["product", cleanItemId], (oldData) => ({
        ...oldData,
        isFavorite: data.isFavorite,
        favoriteCount: data.favoriteCount,
      }));
    },
    onError: (error) => {
      console.error("찜하기/해제 오류:", error);
      showModal({
        content: "찜하기/해제 중 오류가 발생했습니다.",
        confirmText: "확인",
      });
    },
  });

  return {
    updateMutation,
    deleteMutation,
    favoriteMutation,
  };
};
