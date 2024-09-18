import styles from "@/styles/RegistPage.module.css";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function ModifyArticle() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/article/${id}`);
        const article = response.data;

        setTitle(article.title);
        setContent(article.content);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const validateTitle = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length < 2) {
      setTitleError("*2자 이상 입력해주세요");
      return false;
    } else if (trimmedValue.length > 50) {
      setTitleError("*50자 이내로 입력해주세요");
      return false;
    } else {
      setTitleError("");
      return true;
    }
  };

  const validateContent = (value) => {
    if (value.length > 100) {
      setContentError("*100자 이내로 입력해주세요");
      return false;
    } else {
      setContentError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isTitleValid = validateTitle(title);
    const isContentValid = validateContent(content);

    if (isTitleValid && (content === "" || isContentValid)) {
      try {
        await axios.patch(`/article/${id}`, {
          title,
          content,
        });
        router.push(`/articles/${id}`);
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
  };

  return (
    <div className={styles.registContainer}>
      <div className={styles.registNav}>
        <p className={styles.registNavTitle}>게시글 수정</p>
        <button
          className={styles.registNavBtn}
          onClick={handleSubmit}
          disabled={!!titleError || !!contentError}
          style={{
            backgroundColor:
              !titleError && !contentError ? "var(--brand-blue)" : "#9ca3af",
            cursor: !titleError && !contentError ? "pointer" : "not-allowed",
          }}
        >
          수정하기
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.registTitleContainer}>
          <label className={styles.registTitle}>*제목</label>
          <br />
          <input
            className={`${styles.registTitleInput} ${
              titleError
                ? styles.registTitleInputInvalid
                : styles.registTitleInputValid
            }`}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              validateTitle(e.target.value);
            }}
            onBlur={() => {
              if (!title.trim()) {
                setTitleError("*제목을 입력해주세요");
              }
            }}
          />
          {titleError && (
            <p className={styles.registTitleMessage}>{titleError}</p>
          )}
        </div>
        <div className={styles.registContentContainer}>
          <label className={styles.registContent}>*내용</label>
          <br />
          <textarea
            className={`${styles.registContentInput} ${
              contentError
                ? styles.registTitleInputInvalid
                : styles.registTitleInputValid
            }`}
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              validateContent(e.target.value);
            }}
          />
          {contentError && (
            <p className={styles.registTitleMessage}>{contentError}</p>
          )}
        </div>
      </form>
    </div>
  );
}
