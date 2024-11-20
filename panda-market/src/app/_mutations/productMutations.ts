import { api } from "@/app/_trpc/client";

export const useProductMutations = (productId: string) => {
  const utils = api.useUtils();

  const commentMutation = api.comment.createProductComment.useMutation({
    onSuccess: () => {
      void utils.product.getById.invalidate(productId);
    },
  });

  const updateCommentMutation = api.comment.update.useMutation({
    onSuccess: () => {
      void utils.product.getById.invalidate(productId);
    },
  });

  const deleteCommentMutation = api.comment.delete.useMutation({
    onSuccess: () => {
      void utils.product.getById.invalidate(productId);
    },
  });

  const toggleLikeMutation = api.product.toggleLike.useMutation({
    onSuccess: () => {
      void utils.product.getById.invalidate(productId);
    },
  });

  return {
    commentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    toggleLikeMutation,
  };
};
