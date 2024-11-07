import React, { useState } from "react";
import { useRouter } from "next/router";
import { updateArticle } from "../api/articleApi";
import styles from "./RegisterButton.module.css";

interface EditButtonProps {
  articleId: number;
  title: string;
  content: string;
  onClick?: () => void; // onClick을 옵셔널로 일단..
}

const EditButton: React.FC<EditButtonProps> = ({ articleId, title, content, onClick }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("수정 요청 게시글 ID:", articleId);

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateArticle(articleId, { title, content });

      alert("게시글이 수정되었습니다.");
      console.log("수정된 게시글 ID:", articleId);

      router.replace(`/articles/${articleId}`);

      if (onClick) {
        onClick();
      }
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생했습니다:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
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
      {isSubmitting ? "수정 중..." : "수정"}
    </button>
  );
};

export default EditButton;

