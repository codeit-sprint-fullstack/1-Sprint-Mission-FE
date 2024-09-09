'use client';
import classNames from 'classnames';
import styles from '@shared/components/Buttons/ActionButton.module.css';
import { useRouter } from 'next/navigation';

export default function ActionButton({ content, type, path, disabled }) {
  const router = useRouter();

  const buttonClass = classNames({
    [styles['login-button']]: type === 'login', // 로그인
    [styles['signup-button']]: type === 'signup', // 회원가입
    [styles['post-button']]: type === 'post', // 게시글 등록
    [styles['write-button']]: type === 'write', // 게시글 글쓰기
    [styles['disabled']]: disabled,
  });

  const handleNavigate = (path) => {
    router.push(path);
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
        <button className={buttonClass} disabled={disabled}>
          {content}
        </button>
      );
    }
  };

  return <Button />;
}
