'use client';
import classNames from 'classnames';
import styles from '@shared/components/Buttons/CRUDButtons/PatchButton.module.css';
import { usePatchArticle } from 'src/hooks/article/useArticleMutations';

export default function PatchButton({ content, style, disabled, type }) {
  const buttonClass = classNames({
    [styles[style]]: true,
    [styles['disabled']]: disabled,
  });

  const usePatchArticleMutation = usePatchArticle();

  const handlePost = () => {
    if (type === 'article') {
      usePatchArticleMutation.mutate();
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
