import styles from "./EditBoard.module.css";
import { useState } from "react";
import { validateForm } from "@/hooks/useValidation";

export default function EditBoard({ formData, onChange, setFormValid }) {
  const [errors, setErrors] = useState({});

  const validateAndSetFormValid = (name, value) => {
    const validationErrors = validateForm({ ...formData, [name]: value });
    setErrors(validationErrors);

    const isFormValid =
      formData.title &&
      formData.content &&
      Object.keys(validationErrors).length === 0;
    setFormValid(isFormValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(e);
    validateAndSetFormValid(name, value);
  };

  return (
    <form className={styles.createForm}>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel}>*제목</label>
        <input
          className={styles.formInput}
          name="title"
          placeholder="제목을 입력해주세요"
          value={formData.title}
          onChange={handleChange}
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
  );
}
