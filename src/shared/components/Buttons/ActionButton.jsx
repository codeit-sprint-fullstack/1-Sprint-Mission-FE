'use client';
import classNames from 'classnames';
import styles from '@shared/components/Buttons/ActionButton.module.css';
import { useRouter } from 'next/navigation';

export default function ActionButton({ content, type, path }) {
  const router = useRouter();

  const buttonClass = classNames({
    [styles['login-button']]: type === 'login',
    [styles['signup-button']]: type === 'signup',
    [styles['default-button']]: type === 'default',
    [styles['write-button']]: type === 'write',
  });

  const handleNavigate = (path) => {
    router.push(path);
  };
  return (
    <button className={buttonClass} onClick={() => handleNavigate(path)}>
      {content}
    </button>
  );
}
