import { api } from "@/app/_trpc/client";

export const usePostMutations = (postId: string) => {
  const utils = api.useUtils();

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      void utils.post.getById.invalidate(postId);
    },
  });

  const deletePost = api.post.delete.useMutation();

  const createComment = api.comment.createPostComment.useMutation({
    onSuccess: () => {
      void utils.post.getById.invalidate(postId);
    },
  });

  const updateComment = api.comment.update.useMutation({
    onSuccess: () => {
      void utils.post.getById.invalidate(postId);
    },
  });

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      void utils.post.getById.invalidate(postId);
    },
  });

  return {
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
  } as const;
};

export type PostMutations = ReturnType<typeof usePostMutations>;
