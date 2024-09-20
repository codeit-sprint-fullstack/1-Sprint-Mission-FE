import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../PostRegistrationPage.module.css";
import { fetchArticleById, updateArticle } from "../../api/api"; // 게시글 상세조회 및 게시글 수정 API
import FreeBoardPageHeader from "../../components/FreeBoardPageHeader";
import Footer from "../../components/Footer";
import usePostFormValidation from "../../hooks/usePostFormValidation"; // 유효성 검사 훅

const INITIAL_VALUES = {
  title: "",
  content: "",
};

export default function PostEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const { values, setValues, errors, validate, handleBlur } =
    usePostFormValidation(INITIAL_VALUES);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = await fetchArticleById(id);
          setValues({
            title: post.title,
            content: post.content,
          });
        } catch (error) {
          console.error("게시글 가져오기 실패", error);
        }
      };

      fetchPost();
    }
  }, [id]);

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      // 게시글 수정
      await updateArticle(id, {
        title: values.title || "",
        content: values.content || "",
      });

      // 게시글 상세 페이지로 이동
      router.push(`/post-detail/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패", error);
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      values.title.trim() &&
      values.content.trim()
    );
  };

  return (
    <div className={styles.RegistrationPage}>
      <FreeBoardPageHeader />
      <div className={styles.productForm}>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.FormTop}>
            <h2 className={styles.PostRegistrationH1}>게시글 수정</h2>
            <button type="submit" disabled={isSubmitting || !isFormValid()}>
              수정
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
              게시물 수정 실패: {submittingError.message}
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
