import React from 'react';
import { useRouter } from 'next/router';
import styles from './LoginButton.module.css';

const LoginButton = () => {
  const router = useRouter();

  const handleClick = () => {
    // 로그인 페이지로 이동
    router.push('/login');
  };

  return (
    <button className={styles.loginButton} onClick={handleClick}>
      로그인
    </button>
  );
};

export default LoginButton;

