import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./PostRegistrationPage.module.css";
import { createArticle } from "../api/api";
import FreeBoardPageHeader from "../components/FreeBoardPageHeader";
import usePostFormValidation from "../hooks/usePostFormValidation";
import Footer from "../components/Footer";
import Image from "next/image";

const INITIAL_VALUES = {
  title: "",
  content: "",
};

export default function PostRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [images, setImages] = useState([]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("최대 3개의 이미지를 업로드할 수 있습니다.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
    e.target.value = null; // 초기화
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUploadButtonClick = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("imageUploadInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      const { id } = await createArticle({
        title: values.title || "",
        content: values.content || "",
        images: images, // 이미지 파일 포함
      });

      router.push(`/post-detail/${id}`);
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
      <FreeBoardPageHeader />
      <div className={styles.productForm}>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.FormTop}>
            <h2 className={styles.PostRegistrationH1}>게시글 쓰기</h2>
            <button type="submit" disabled={isSubmitting || !isFormValid()}>
              등록
            </button>
          </div>

          {/* 이미지 등록 및 미리보기 추가 */}
          <div className={styles.imageRegist}>
            <label className={styles.Label}>
              * 상품 이미지
              <div className={styles.imageUploadContainer}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="imageUploadInput"
                />
                <div
                  className={styles.imageUpload}
                  onClick={handleUploadButtonClick}
                >
                  <Image
                    src="/images/ic_plus.png"
                    alt="이미지 등록 +"
                    className={styles.plusIcon}
                    width={48}
                    height={48}
                  />
                  <p>이미지 등록</p>
                </div>
              </div>
            </label>

            <div className={styles.imagePreviewContainer}>
              {images.map((file, index) => {
                const imageUrl = URL.createObjectURL(file);
                return (
                  <div key={index} className={styles.imageContainer}>
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className={styles.imagePreviewImage}
                    />
                    <button
                      type="button"
                      className={styles.removeImage}
                      onClick={() => handleImageRemove(index)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
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
