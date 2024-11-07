import React from "react";
import { useRouter } from "next/router";
import styles from "./WriteButton.module.css";

const WriteButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/articles/create");
  };

  return (
    <button className={styles.writeButton} onClick={handleClick}>
      글쓰기
    </button>
  );
};

export default WriteButton;
