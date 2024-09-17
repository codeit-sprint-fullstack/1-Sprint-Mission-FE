import {
  usePatchArticleStore,
  usePostArticleStore,
} from '@shared/store/article/article';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteArticle, patchArticle, postArticle } from '@utils/api/api';
import { useParams, useRouter } from 'next/navigation';

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { articleId } = useParams();

  return useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      alert('게시글이 성공적으로 삭제되었습니다.');
      router.push('/articles');
    },
    onError: (error) => {
      console.log(error);
      alert('게시글 삭제에 실패했습니다.');
    },
  });
}

export function usePostArticle() {
  const { title, content } = usePostArticleStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => postArticle({ title, content }),
    onSuccess: (data) => {
      const { id } = data;
      queryClient.invalidateQueries(['articles']);
      router.push(`/articles/${id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function usePatchArticle() {
  const { title, content } = usePatchArticleStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { articleId } = useParams();

  return useMutation({
    mutationFn: () => patchArticle(articleId, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      router.push(`/articles/${articleId}`).then(() => {
        queryClient.refetchQueries(['article', articleId]);
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
