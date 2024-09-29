import styles from "@/styles/RegistPage.module.css";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function Modify() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [isValid, setIsValid] = useState({
    isTitle: true,
    isContent: null,
  });
  const [validMessage, setValidMessage] = useState({
    titleValid: "",
    contentValid: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`/article/${id}`).then((response) => {
        const article = response.data;

        setForm({
          title: article.title,
          content: article.content,
        });
      });
    }
  }, [id]);

  const validateTitle = (title) => {
    const trimmedTitle = title.trim();
    if (title.length === 0) {
      setIsValid({ ...isValid, isTitle: null });
      setValidMessage({ ...validMessage, titleValid: "" });
    } else if (trimmedTitle.length < 2) {
      setIsValid({ ...isValid, isTitle: false });
      setValidMessage({
        ...validMessage,
        titleValid: "*2자 이상 입력해주세요",
      });
    } else if (title.length > 50) {
      setIsValid({ ...isValid, isTitle: false });
      setValidMessage({
        ...validMessage,
        titleValid: "*50자 이내로 입력해주세요",
      });
    } else {
      setIsValid({ ...isValid, isTitle: true });
      setValidMessage({ ...validMessage, titleValid: "" });
    }
  };

  const validateContent = (content) => {
    if (content.length === 0) {
      setIsValid({ ...isValid, isContent: null });
      setValidMessage({ ...validMessage, contentValid: "" });
    } else if (content.length > 100) {
      setIsValid({ ...isValid, isContent: false });
      setValidMessage({
        ...validMessage,
        contentValid: "*100자 이내로 입력해주세요",
      });
    } else {
      setIsValid({ ...isValid, isContent: true });
      setValidMessage({ ...validMessage, contentValid: "" });
    }
  };

  useEffect(() => {
    validateTitle(form.title);
  }, [form.title]);

  useEffect(() => {
    validateContent(form.content);
  }, [form.content]);

  const handleTitleBlur = () => {
    if (form.title.trim() === "") {
      setValidMessage({
        ...validMessage,
        titleValid: "*제목을 입력해주세요",
      });
      setIsValid({ ...isValid, isTitle: false });
    }
  };

  const isFormValid =
    isValid.isTitle === true &&
    (isValid.isContent === null || isValid.isContent === true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.patch(`/article/${id}`, {
          title: form.title,
          content: form.content,
        });
        router.push(`/articles/${id}`);
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <>
      <div className={styles.regist_container}>
        <div className={styles.regist_nav}>
          <p className={styles.regist_nav_title}>게시글 쓰기</p>
          <button
            className={styles.regist_nav_btn}
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
          <div className={styles.regist_title_container}>
            <label className={styles.regist_title}>*제목</label>
            <br />
            <input
              className={`${styles.regist_title_input} ${
                isValid.isTitle === null
                  ? ""
                  : isValid.isTitle
                  ? styles.regist_title_input_valid
                  : styles.regist_title_input_invalid
              }`}
              placeholder="제목을 입력해주세요"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              onBlur={handleTitleBlur}
            />
            <p className={styles.regist_title_message}>
              {validMessage.titleValid}
            </p>
          </div>
          <div className={styles.regist_content_container}>
            <label className={styles.regist_content}>*내용</label>
            <br />
            <textarea
              className={`${styles.regist_content_input} ${
                isValid.isContent === null
                  ? ""
                  : isValid.isContent
                  ? styles.regist_title_input_valid
                  : styles.regist_title_input_invalid
              }`}
              placeholder="내용을 입력해주세요"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <p className={styles.regist_title_message}>
              {validMessage.contentValid}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
