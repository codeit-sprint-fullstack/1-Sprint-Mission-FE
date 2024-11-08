import React from "react";
import { useRouter } from "next/router";
import styles from "./LoginButton.module.css";

const LoginButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <button className={styles.loginButton} onClick={handleClick}>
      로그인
    </button>
  );
};

export default LoginButton;

