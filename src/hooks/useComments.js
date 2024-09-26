import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, createComment } from '../api/commentApi';

export const useComments = (productId) => {
  const queryClient = useQueryClient();

  // 댓글 목록 불러오기
  const { data: comments, error: commentsError, isLoading } = useQuery({
    queryKey: ['comments', productId],
    queryFn: () => getComments(productId),  // productId를 이용해 댓글 목록을 불러옴
    enabled: !!productId,  // productId가 존재할 때만 실행
  });

  // 댓글 추가
  const createCommentMutation = useMutation({
    mutationFn: (content) => createComment(productId, content),  // 댓글 추가 API 호출
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', productId]);  // 성공 시 데이터 갱신
    },
  });

  return {
    comments,
    commentsError,
    isLoading,
    createCommentMutation,
  };
};

