import React, { useState } from "react";
import { useRouter } from "next/router";
import { createArticle } from "../api/articleApi";
import styles from "./RegisterButton.module.css";

interface ArticleData {
  title: string;
  content: string;
}

interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterButtonProps {
  title: string;
  content: string;
  createdAt?: string; // 옵셔널 속성으로 추가 => 게시글 생성 페이지에서 일단 필요함..
  addNewPost: (newPost: ArticleResponse) => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ title, content, createdAt, addNewPost }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = await createArticle({ title, content, createdAt });
      console.log("새로 등록된 게시글:", newPost);
      addNewPost(newPost);
      router.replace(`/articles/${newPost.id}`);
    } catch (error) {
      console.error("게시글 등록 중 오류가 발생했습니다.", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={styles.registerButton}
      type="button"
      onClick={handleSubmit}
      disabled={isSubmitting || !title || !content}
    >
      {isSubmitting ? "등록 중..." : "등록"}
    </button>
  );
};

export default RegisterButton;
