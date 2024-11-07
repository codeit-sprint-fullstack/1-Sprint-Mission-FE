import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductComments, createProductComment } from "../api/commentApi";

interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
}

export const useComments = (productId: number) => {
  const queryClient = useQueryClient();

  // 댓글 목록 불러오기
  const { data: comments, error: commentsError, isLoading } = useQuery<CommentResponse[], Error>({
    queryKey: ["comments", productId],
    queryFn: () => getProductComments(productId),  // productId로 댓글 목록을 불러옴
    enabled: !!productId,
  });

  // 댓글 추가
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createProductComment(productId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
    },
  });

  return {
    comments,
    commentsError,
    isLoading,
    createCommentMutation,
  };
};

