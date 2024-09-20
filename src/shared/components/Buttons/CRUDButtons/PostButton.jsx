'use client';
import classNames from 'classnames';
import styles from '@shared/components/Buttons/CRUDButtons/PostButton.module.css';
import { usePostComment } from 'src/hooks/comment/useCommentMutations';
import { usePostArticle } from 'src/hooks/article/useArticleMutations';

export default function PostButton({ content, style, disabled, type }) {
  const buttonClass = classNames({
    [styles[style]]: true,
    [styles['disabled']]: disabled,
  });

  const usePostArticleMutation = usePostArticle();
  const usePostCommentMutation = usePostComment();

  const handlePost = () => {
    if (type === 'article') {
      usePostArticleMutation.mutate();
    } else if (type === 'comment') {
      usePostCommentMutation.mutate();
    }
  };

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={() => handlePost()}
    >
      {content}
    </button>
  );
}
