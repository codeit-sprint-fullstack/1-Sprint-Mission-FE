import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./RegistrationPage.module.css";
import { createProduct } from "../api/api";
import ItemsPageHeader from "../components/ItemsPageHeader";
import useFormValidation from "../hooks/useFormValidation";
import Image from "next/image";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

export default function RegistrationPage() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const { values, setValues, errors, validate, handleBlur } =
    useFormValidation(INITIAL_VALUES);
  const router = useRouter();

  // 입력 필드 변경시, 상태 업데이트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 태그 추가하는 핸들러
  const handleTagAdd = (e) => {
    if (e.key === "Enter" && values.tags.trim()) {
      setTags((prevTags) => [...prevTags, values.tags.trim()]);
      setValues((prevValues) => ({
        ...prevValues,
        tags: "", // 태그 입력 후 초기화
      }));
      e.preventDefault();
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("최대 3개의 이미지를 업로드할 수 있습니다.");
      return;
    }

    // 실제 파일 객체를 상태에 저장
    setImages((prevImages) => [...prevImages, ...files]); // 파일 객체 배열로 저장

    e.target.value = null; // null로 설정하여 초기화
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 파일 선택 대화상자를 여는 핸들러
  const handleUploadButtonClick = (event) => {
    event.preventDefault(); // 기본 동작 방지
    const fileInput = document.getElementById("imageUploadInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  // 제출 이벤트
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      await createProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        tags: tags.join(","), // 배열을 문자열로 변환하여 전송
        images: images, // 이제 File 객체 배열이 됨
      });

      setValues(INITIAL_VALUES);
      setTags([]);
      setImages([]); // 이미지 초기화
      router.push("/items"); // 중고마켓 페이지로 이동
    } catch (error) {
      console.error("상품 등록 실패", error);
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      values.name &&
      values.description &&
      values.price > 0
    );
  };

  return (
    <div className={styles.RegistrationPage}>
      <ItemsPageHeader />
      <main className={styles.main}>
        <div className={styles.productForm}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.FormTop}>
              <h2 className={styles.h2}>상품 등록하기</h2>
              <button type="submit" disabled={isSubmitting || !isFormValid()}>
                등록
              </button>
            </div>

            <div className={styles.imageRegist}>
              <label className={styles.Label}>
                상품 이미지
                <div className={styles.imageUploadContainer}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: "none" }} // 파일 입력 숨기기
                    id="imageUploadInput" // ID 설정
                  />
                  <div
                    className={styles.imageUpload}
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 전파 방지
                      handleUploadButtonClick(e); // 파일 선택 대화상자 열기
                    }}
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

              {/* 이미지 미리보기 추가 */}
              <div className={styles.imagePreviewContainer}>
                <div className={styles.imagePreview}>
                  {images.map((file, index) => {
                    const imageUrl = URL.createObjectURL(file); // URL 생성
                    return (
                      <div key={index} className={styles.imageContainer}>
                        <img
                          src={imageUrl} // 일반 img 태그로 변경
                          alt={`Image ${index + 1}`}
                          className={styles.imagePreviewImage}
                          onClick={(e) => {
                            e.stopPropagation(); // 클릭 이벤트 전파 방지
                          }}
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
            </div>

            <label className={styles.Label}>
              상품명
              <input
                id="Input1"
                className={`${styles.RegistrationInput} ${
                  errors.name ? styles.error : ""
                }`}
                type="text"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleInputChange}
                placeholder="상품명을 입력해주세요"
                required
              />
              {errors.name && (
                <div className={styles.errorMessage}>{errors.name}</div>
              )}
            </label>
            <label className={styles.Label}>
              상품 소개
              <textarea
                id="Input2"
                name="description"
                className={`${styles.RegistrationInput} ${
                  errors.description ? styles.error : ""
                }`}
                value={values.description}
                onBlur={handleBlur}
                onChange={handleInputChange}
                placeholder="상품 소개를 입력해주세요"
                required
              />
              {errors.description && (
                <div className={styles.errorMessage}>{errors.description}</div>
              )}
            </label>
            <label className={styles.Label}>
              판매 가격
              <input
                id="Input3"
                className={`${styles.RegistrationInput} ${
                  errors.price ? styles.error : ""
                }`}
                type="number"
                name="price"
                value={values.price}
                onBlur={handleBlur}
                onChange={handleInputChange}
                placeholder="판매 가격을 입력해주세요"
                required
              />
              {errors.price && (
                <div className={styles.errorMessage}>{errors.price}</div>
              )}
            </label>
            <label className={styles.Label}>
              태그
              <input
                id="Input4"
                className={`${styles.RegistrationInput} ${
                  errors.tags ? styles.error : ""
                }`}
                type="text"
                name="tags"
                value={values.tags}
                onBlur={handleBlur}
                onChange={handleInputChange}
                onKeyDown={handleTagAdd}
                placeholder="#태그 형식으로 입력해주세요 (예시, #모자)"
                required
              />
              {errors.tags && (
                <div className={styles.errorMessage}>{errors.tags}</div>
              )}
            </label>

            <div className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <div key={index} className={styles.tagItem}>
                  <span className={styles.tagText}>{tag}</span>
                  <button
                    type="button"
                    className={styles.removeTag}
                    onClick={() => handleTagRemove(tag)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {submittingError && (
              <div className={styles.errorMessage}>
                상품 등록 실패: {submittingError.message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
