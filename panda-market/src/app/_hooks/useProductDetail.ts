import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/app/_trpc/client";
import { useProductMutations } from "../_mutations/productMutations";

export const useProduct = (productId: string) => {
  const { data: session } = useSession();
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    commentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    toggleLikeMutation,
  } = useProductMutations(productId);

  const { data: product, isLoading } = api.product.getById.useQuery(productId, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: likeStatus } = api.product.getLikeStatus.useQuery(
    { productId },
    {
      enabled: !!session,
      retry: false,
    },
  );

  const handleCommentSubmit = async (content: string) => {
    if (!session) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await commentMutation.mutateAsync({
        productId,
        content,
      });
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      setError(
        error instanceof Error ? error.message : "댓글 작성에 실패했습니다.",
      );
    }
  };

  const handleCommentUpdate = async (commentId: string, content: string) => {
    if (!session) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await updateCommentMutation.mutateAsync({
        id: commentId,
        content,
      });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      setError(
        error instanceof Error ? error.message : "댓글 수정에 실패했습니다.",
      );
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!session) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      setError(
        error instanceof Error ? error.message : "댓글 삭제에 실패했습니다.",
      );
    }
  };

  const handleLikeClick = async () => {
    try {
      if (!session) {
        setError("로그인이 필요합니다.");
        return;
      }

      if (isLikeProcessing) return;

      setIsLikeProcessing(true);
      setError(null);

      await toggleLikeMutation.mutateAsync(productId);
    } catch (error) {
      console.error("Like error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "좋아요하기 처리 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLikeProcessing(false);
    }
  };

  return {
    product,
    isLoading,
    error,
    setError,
    isLikeProcessing,
    likeStatus,
    handleCommentSubmit,
    handleCommentUpdate,
    handleCommentDelete,
    handleLikeClick,
  };
};
