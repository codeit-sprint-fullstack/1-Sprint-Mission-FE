import styles from "./CreateForm.module.css";
import { useState } from "react";
import { createArticle } from "@/utils/articleApi"; // post 요청 보내는 함수
import { validateForm } from "@/utils/validation"; // 유효성 검사 함수
import { useRouter } from "next/router";

export default function CreateForm() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter(); // useRouter 훅 사용

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateAndSetFormValid(name, value); // 입력할 때마다 유효성 검사
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return; // 유효성 검사 실패 시 return

    try {
      // 생성된 게시글의 id를 반환받음
      const newArticle = await createArticle({
        title: formData.title,
        content: formData.content,
      });

      if (newArticle && newArticle.id) {
        // 게시글 id로 이동
        router.push(`/board/${newArticle.id}`);
      }

      // 성공 시 폼을 초기화
      setFormData({ title: "", content: "" });
      setFormValid(false);
      document.getElementById("createForm").reset(); // 폼 초기화
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
          onClick={handleSubmit} // 버튼 클릭 시 handleSubmit 호출
        >
          등록
        </button>
      </div>
      <form id="createForm" className={styles.createForm}>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel}>*제목</label>
          <input
            className={styles.formInput}
            name="title"
            placeholder="제목을 입력해주세요"
            value={formData.title}
            onChange={handleChange} // 입력할 때마다 handleChange 호출
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel}>*내용</label>
          <textarea
            className={styles.formInput}
            name="content"
            placeholder="내용을 입력해주세요"
            value={formData.content}
            onChange={handleChange}
          />
          {errors.content && <p className={styles.error}>{errors.content}</p>}
        </div>
      </form>
    </div>
  );
}
