import styles from "./CreateForm.module.css";
import { useState } from "react";
import { createArticle } from "@/utils/articleApi";
import { validateForm } from "@/hooks/useValidation";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";

export default function CreateForm() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ title: false, content: false });

  const router = useRouter();

  // 유효성 검사 및 formValid 설정
  const validateAndSetFormValid = (name, value) => {
    const newFormData = { ...formData, [name]: value };
    const validationErrors = validateForm(newFormData);
    setErrors(validationErrors);

    const isFormValid =
      newFormData.title &&
      newFormData.content &&
      Object.keys(validationErrors).length === 0;
    setFormValid(isFormValid);
  };

  // 입력 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    validateAndSetFormValid(name, value);
  };

  // 최종 submit 시 유효성 검사 추가
  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // 모든 필드를 'touched'로 설정
    setTouched({ title: true, content: true });

    // 유효성 검사에 실패하면 return
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const newArticle = await createArticle({
        title: formData.title,
        content: formData.content,
      });

      if (newArticle && newArticle.id) {
        router.push(ROUTES.ARTICLE(newArticle.id));
      }

      setFormData({ title: "", content: "" });
      setFormValid(false);
      document.getElementById("createForm").reset();
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>게시글 쓰기</h2>
        <button
          type="button"
          className={styles.addBtn}
          disabled={!formValid}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      <form id="createForm" className={styles.createForm}>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="title">
            *제목
          </label>
          <input
            className={styles.formInput}
            name="title"
            placeholder="제목을 입력해주세요"
            value={formData.title}
            onChange={handleChange}
            id="title"
          />
          {touched.title && errors.title && (
            <p className={styles.error}>{errors.title}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="content">
            *내용
          </label>
          <textarea
            className={styles.formInput}
            name="content"
            placeholder="내용을 입력해주세요"
            value={formData.content}
            onChange={handleChange}
            id="content"
          />
          {touched.content && errors.content && (
            <p className={styles.error}>{errors.content}</p>
          )}
        </div>
      </form>
    </div>
  );
}
