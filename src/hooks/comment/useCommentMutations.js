import { useCommentContentStore } from '@shared/store/article/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, postComment } from '@utils/api/api';
import { useParams } from 'next/navigation';

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params) => deleteComment(params),
    onSuccess: () => {
      queryClient.invalidateQueries(['articleComments']);
      alert('댓글이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error);
      alert('댓글 삭제에 실패했습니다.');
    },
  });
}

export function usePostComment() {
  const { content } = useCommentContentStore();
  const queryClient = useQueryClient();
  const { articleId } = useParams();

  return useMutation({
    mutationFn: () => postComment({ articleId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['articleComments']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
