'use client';
import classNames from 'classnames';
import styles from '@shared/components/Buttons/ActionButton.module.css';
import { useParams, useRouter } from 'next/navigation';

export default function ActionButton({ content, style, path, disabled, type }) {
  const router = useRouter();
  const { articleId } = useParams();

  const buttonClass = classNames({
    [styles[style]]: true,
    [styles['disabled']]: disabled,
  });

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleDynamicNavigate = () => {
    if (type === 'article-patch') {
      router.push(`/articles/patch/${articleId}`);
    }
  };

  const Button = () => {
    if (path) {
      return (
        <button className={buttonClass} onClick={() => handleNavigate(path)}>
          {content}
        </button>
      );
    } else {
      return (
        <button
          className={buttonClass}
          disabled={disabled}
          onClick={handleDynamicNavigate}
        >
          {content}
        </button>
      );
    }
  };

  return <Button />;
}
