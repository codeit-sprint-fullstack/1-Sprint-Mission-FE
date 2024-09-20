'use client';
import classNames from 'classnames';
import { useDeleteArticle } from 'src/hooks/article/useArticleMutations';
import { useDeleteComment } from 'src/hooks/comment/useCommentMutations';
import styles from '@shared/components/Buttons/CRUDButtons/DeleteButton.module.css';
import { useCommentIdStore } from '@shared/store/article/commentId';

export default function DeleteButton({ content, type, option, disabled }) {
  const { commentId } = useCommentIdStore();

  const buttonClass = classNames({
    [styles[type]]: true,
    [styles['disabled']]: disabled,
  });

  const useDeleteArticleMutation = useDeleteArticle();
  const useDeleteCommentMutation = useDeleteComment();

  const handleDelete = () => {
    if (option === 'article') {
      useDeleteArticleMutation.mutate({ commentId });
    } else if (option === 'comment') {
      useDeleteCommentMutation.mutate({ commentId });
    }
  };

  return (
    <button className={buttonClass} onClick={handleDelete}>
      {content}
    </button>
  );
}
