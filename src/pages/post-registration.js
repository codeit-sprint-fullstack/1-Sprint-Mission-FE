import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/PostRegistrationPage.module.css";
import { createArticle } from "../api/api";
import ItemsPageHeader from "../components/ItemsPageHeader";
import usePostFormValidation from "../hooks/usePostFormValidation";
import Footer from "../components/Footer";

const INITIAL_VALUES = {
  title: "",
  content: "",
};

export default function PostRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const { values, setValues, errors, validate, handleBlur } =
    usePostFormValidation(INITIAL_VALUES);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      await createArticle({
        title: values.title || "",
        content: values.content || "",
      });

      setValues(INITIAL_VALUES);
      router.push("/Productinformation");
    } catch (error) {
      console.error("게시글 등록 실패", error);
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && values.title && values.content;
  };

  return (
    <div className={styles.RegistrationPage}>
      <ItemsPageHeader />
      <div className={styles.productForm}>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.FormTop}>
            <h2>게시글 쓰기</h2>
            <button type="submit" disabled={isSubmitting || !isFormValid()}>
              등록
            </button>
          </div>
          <label className={styles.label1}>
            * 제목
            <input
              id="Input1"
              className={`${styles.RegistrationInput} ${
                errors.title ? styles.error : ""
              }`}
              type="text"
              name="title"
              value={values.title || ""}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="제목을 입력해주세요"
              required
            />
            {errors.title && (
              <div className={styles.errorMessage}>{errors.title}</div>
            )}
          </label>
          <label className={styles.label2}>
            * 내용
            <textarea
              id="Input2"
              name="content"
              className={`${styles.RegistrationInput} ${
                errors.content ? styles.error : ""
              }`}
              value={values.content || ""}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="내용을 입력해주세요"
              required
            />
            {errors.content && (
              <div className={styles.errorMessage}>{errors.content}</div>
            )}
          </label>

          {submittingError && (
            <div className={styles.errorMessage}>
              게시물 등록 실패: {submittingError.message}
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
