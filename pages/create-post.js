import styles from "@styles/CreatePost.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

export default function CreatePost() {
  const router = useRouter();
  const {
    id,
    createMode = "게시글 쓰기",
    title: queryTitle,
    content: queryContent,
  } = router.query;

  const [title, setTitle] = useState(queryTitle || "");
  const [content, setContent] = useState(queryContent || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;
    setIsLoading(true);

    try {
      if (createMode === "게시글 쓰기") {
        const res = await axios.post("/articles", { title, content });
        const postId = res.data.id;

        router.push(`/community/${postId}`);
      } else if (createMode === "게시글 수정하기") {
        await axios.patch(`/articles/${id}`, { title, content });

        router.push(`/community/${id}`);
      }
    } catch (error) {
      console.error("게시글 등록/수정에 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = title !== "" && content !== "";

  return (
    <form className={styles.body} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <span className="text-xl bold">{createMode}</span>
        <button
          type="submit"
          className={`${styles.postButton} ${
            isFormValid ? styles.active : ""
          } text-lg semibold`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading
            ? "로딩중..."
            : createMode === "게시글 쓰기"
            ? "등록"
            : "수정"}
        </button>
      </div>
      <div className={`${styles.formGroup} text-2lg bold`}>
        <label htmlFor="title">*제목</label>
        <input
          type="text"
          id="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={`${styles.formGroup} text-2lg bold`}>
        <label htmlFor="content">*내용</label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
      </div>
    </form>
  );
}
