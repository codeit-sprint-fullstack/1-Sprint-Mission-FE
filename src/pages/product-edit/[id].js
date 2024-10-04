// 상품 게시글 수정 페이지

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../RegistrationPage.module.css";
import { fetchProductById, updateProduct } from "../../api/api";
import ItemsPageHeader from "../../components/ItemsPageHeader";
import useFormValidation from "../../hooks/useFormValidation";
import Image from "next/image";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

export default function EditProductPage() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const { values, setValues, errors, validate, handleBlur } =
    useFormValidation(INITIAL_VALUES);
  const router = useRouter();

  // 수정할 상품의 정보를 가져와서 초기값으로 설정
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = router.query.id; // 상품 ID를 URL에서 가져오기
        const response = await fetchProductById(productId);
        const product = response.product; // product 객체를 가져옴

        console.log("가져온 상품:", product); // API로부터 받은 상품 정보

        // 기존 정보로 초기화
        setValues({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "", // price를 문자열로 초기화
          tags: "", // 태그는 빈 문자열로 초기화
        });

        // tags를 배열로 설정
        setTags(product.tags || []);
        setImages(product.images || []); // 이미지가 없을 경우 빈 배열 설정
      } catch (error) {
        console.error("상품 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    if (router.query.id) {
      fetchProduct();
    }
  }, [router.query.id]);

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
      if (tags.length < 5) {
        // 태그가 5개 미만일 때만 추가
        setTags((prevTags) => [...prevTags, values.tags.trim()]);
        setValues((prevValues) => ({
          ...prevValues,
          tags: "",
        }));
      } else {
        alert("최대 5개의 태그를 입력할 수 있습니다.");
      }
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

      const productId = router.query.id; // 상품 ID
      console.log("수정할 상품 데이터:", {
        name: values.name,
        description: values.description,
        price: values.price,
        tags: tags, // 배열 그대로 전달
        images: images,
      });

      // 수정 요청
      const response = await updateProduct(productId, {
        name: values.name,
        description: values.description,
        price: values.price,
        tags: tags,
        images: images,
      });

      console.log("수정 결과:", response); // 응답 확인

      if (response.id.toString() === productId.toString()) {
        // 수정이 성공적으로 이루어졌다면, 해당 상품 정보를 다시 가져오기
        alert("상품이 성공적으로 수정되었습니다.");
        setTags([]); // 태그 초기화
        setImages([]); // 이미지 초기화
        // 상세 페이지로 이동
        router.push(`/items/${productId}`);
      } else {
        // 응답이 200이 아닐 경우 에러 처리
        console.error(
          "수정된 상품 데이터와 요청한 데이터가 일치하지 않습니다."
        );
        throw new Error("상품 수정 실패");
      }
    } catch (error) {
      console.error("상품 수정 실패", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data); // 서버의 에러 메시지 출력
      }
      setSubmittingError(error);
    }
  };

  // 전체 폼의 상태를 관리하는 함수(각 필드에서 발생한 에러가 없는지 확인)
  const isFormValid = () => {
    return Object.keys(errors).length === 0; // errors가 비어있다면 유효하다고 판단
  };

  return (
    <div className={styles.RegistrationPage}>
      <ItemsPageHeader />
      <main className={styles.main}>
        <div className={styles.productForm}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.FormTop}>
              <h2 className={styles.h2}>상품 수정하기</h2>
              <button type="submit" disabled={isSubmitting || !isFormValid()}>
                수정
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
                    <p>이미지 수정</p>
                  </div>
                </div>
              </label>

              {/* 이미지 미리보기 추가 */}
              <div className={styles.imagePreviewContainer}>
                <div className={styles.imagePreview}>
                  {images.map((file, index) => {
                    if (file instanceof File) {
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
                    }
                    return null; // 파일 객체가 아니면 아무것도 렌더링하지 않음
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
                상품 수정 실패: {submittingError.message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
