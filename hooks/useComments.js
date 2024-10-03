import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchCommentsApi,
  postCommentApi,
  deleteCommentApi,
  editCommentApi,
} from '@/utils/api/commentApi.js';

export function useComments({ articleId, category }) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['comments', articleId],
    queryFn: ({ pageParam = null }) =>
      fetchCommentsApi({ articleId, category, cursorId: pageParam }),
    getNextPageParam: (lastPage) => {
      const comments = lastPage.comments || [];

      return comments.length <= 4
        ? undefined
        : comments[comments.length - 1].id;
    },
  });

  const uniqueComments = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.comments)
        .map((comment) => [comment.id, comment])
    ).values() || []
  );

  const totalCount = data?.pages[0].totalCount;

  return {
    uniqueComments,
    fetchNextPage,
    isLoading,
    totalCount,
  };
}

export function useEditComment({ articleId }) {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: (targetId) => deleteCommentApi(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });

  const deleteComments = (targetId) => {
    deleteCommentMutation.mutate(targetId);
  };

  const postCommentMutation = useMutation({
    mutationFn: (newComment) => postCommentApi(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ id, editComment, articleId }) =>
      editCommentApi({ id, editComment, articleId }),
    onSuccess: (newComment) => {
      queryClient.setQueryData(['comments', articleId], (previous) => {
        if (!previous) return [];

        return {
          ...previous,
          pages: previous.pages.map((page) => ({
            ...page,
            comments: page.comments.map((comment) =>
              comment.id === newComment.id ? newComment : comment
            ),
          })),
        };
      });

      queryClient.invalidateQueries({
        queryKey: ['comments', articleId],
      });
    },
  });

  return {
    postCommentMutation,
    editCommentMutation,
    deleteComments,
  };
}
