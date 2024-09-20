import styles from "@/styles/registPage.module.css";
import { useState, useEffect } from "react";
import axios from "@/pages/api/axios";
import { useRouter } from "next/router";

export default function RegisterArticle() {
  const router = useRouter();

  // 개별 상태 관리로 변경하여 코드 단순화
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isTitleValid, setIsTitleValid] = useState(null);
  const [isContentValid, setIsContentValid] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const validateTitle = (value) => {
    const trimmedTitle = value.trim();
    if (trimmedTitle.length === 0) {
      setIsTitleValid(null);
      setTitleError("");
    } else if (trimmedTitle.length < 2) {
      setIsTitleValid(false);
      setTitleError("*2자 이상 입력해주세요");
    } else if (trimmedTitle.length > 50) {
      setIsTitleValid(false);
      setTitleError("*50자 이내로 입력해주세요");
    } else {
      setIsTitleValid(true);
      setTitleError("");
    }
  };

  const validateContent = (value) => {
    const trimmedContent = value.trim();
    if (trimmedContent.length === 0) {
      setIsContentValid(null);
      setContentError("");
    } else if (trimmedContent.length > 100) {
      setIsContentValid(false);
      setContentError("*100자 이내로 입력해주세요");
    } else {
      setIsContentValid(true);
      setContentError("");
    }
  };

  useEffect(() => {
    validateTitle(title);
  }, [title]);

  useEffect(() => {
    validateContent(content);
  }, [content]);

  const handleTitleBlur = () => {
    if (title.trim() === "") {
      setIsTitleValid(false);
      setTitleError("*제목을 입력해주세요");
    }
  };

  const isFormValid =
    isTitleValid === true &&
    (isContentValid === null || isContentValid === true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post("/article", {
          title,
          content,
        });
        const { id } = response.data;
        router.push(`/articles/${id}`);
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <div className={styles.registContainer}>
      <div className={styles.registNav}>
        <p className={styles.registNavTitle}>게시글 쓰기</p>
        <button
          className={styles.registNavBtn}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? "var(--brand-blue)" : "#9ca3af",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      <form>
        <div className={styles.registTitleContainer}>
          <label className={styles.registTitle}>*제목</label>
          <br />
          <input
            className={`${styles.registTitleInput} ${
              isTitleValid === null
                ? ""
                : isTitleValid
                ? styles.registTitleInputValid
                : styles.registTitleInputInvalid
            }`}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
          />
          <p className={styles.registTitleMessage}>{titleError}</p>
        </div>
        <div className={styles.registContentContainer}>
          <label className={styles.registContent}>*내용</label>
          <br />
          <textarea
            className={`${styles.registContentInput} ${
              isContentValid === null
                ? ""
                : isContentValid
                ? styles.registTitleInputValid
                : styles.registTitleInputInvalid
            }`}
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className={styles.registTitleMessage}>{contentError}</p>
        </div>
      </form>
    </div>
  );
}
