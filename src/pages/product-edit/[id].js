import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../ProductEditPage.module.css"; // CSS 모듈 가져오기
import { fetchProductById, updateProduct } from "../../api/api";
import ItemsPageHeader from "../../components/ItemsPageHeader";
import useProductFormValidation from "../../hooks/useFormValidation";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

export default function ModificationPage() {
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [productId, setProductId] = useState(null);
  const { values, setValues, errors, validate, handleBlur } =
    useProductFormValidation(INITIAL_VALUES);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query; // URL에서 id 가져오기
    if (id) {
      setProductId(id);
      const fetchProduct = async () => {
        try {
          const productData = await fetchProductById(id); // API 호출
          setValues({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            tags: productData.tags.join(", "), // 태그는 문자열로 변환
          });
          setTags(productData.tags); // 태그 상태 업데이트
        } catch (error) {
          console.error("제품 정보 가져오기 실패", error);
          setSubmittingError({
            message: "상품 정보를 가져오는 데 실패했습니다.",
          });
        }
      };

      fetchProduct();
    }
  }, [router.query]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && values.tags.trim()) {
      setTags((prevTags) => [...prevTags, values.tags.trim()]);
      setValues((prevValues) => ({
        ...prevValues,
        tags: "",
      }));
      e.preventDefault();
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      await updateProduct(productId, {
        name: values.name,
        description: values.description,
        price: parseFloat(values.price), // 가격을 숫자로 변환
        tags: tags,
      });

      router.push("/Productinformation");
    } catch (error) {
      console.error("상품 수정 실패", error);
      setSubmittingError({ message: "상품 수정에 실패했습니다." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      values.name &&
      values.description &&
      parseFloat(values.price) > 0 // 숫자 검사 추가
    );
  };

  return (
    <>
      <ItemsPageHeader />
      <div className={styles.ModificationPage}>
        <div className={styles.productForm}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.FormTop}>
              <h2 className={styles.h2}>상품 수정하기</h2>
              <button type="submit" disabled={isSubmitting || !isFormValid()}>
                수정
              </button>
            </div>
            <label className={styles.Label1}>
              상품명
              <input
                id="Input1"
                className={`${styles.ModificationInput} ${
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
            <label className={styles.Label2}>
              상품 소개
              <textarea
                id="Input2"
                name="description"
                className={`${styles.ModificationInput} ${
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
            <label className={styles.Label3}>
              판매 가격
              <input
                id="Input3"
                className={`${styles.ModificationInput} ${
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
            <label className={styles.Label4}>
              태그
              <input
                id="Input4"
                className={`${styles.ModificationInput} ${
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
      </div>
    </>
  );
}
