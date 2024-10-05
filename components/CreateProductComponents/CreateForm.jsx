import React, { useEffect, useState } from "react";
import styles from "./CreateForm.module.css";
import { useValidateForm } from "@/hooks/useValidation";
import ImageUpload from "./ImageUpload";

function CreateForm({ onFormChange, onFormValuesChange }) {
  const initialState = {
    productName: "",
    productIntro: "",
    productPrice: "",
    productTag: "",
  };

  const validations = {
    productName: { required: true, minLength: 1, maxLength: 10 },
    productIntro: { required: true, minLength: 10, maxLength: 200 },
    productPrice: { required: true, pattern: /^[0-9]+$/ },
    productTag: { maxLength: 5 },
  };

  const { values, errors, handleChange, handleSubmit, setValues } =
    useValidateForm(initialState, validations);

  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // 이미지 상태 추가

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      Object.entries(values).every(([key, value]) => {
        if (key === "productTag") return true;
        return value;
      }) &&
      tags.length > 0 &&
      uploadedImages.length > 0; // 이미지가 최소 1개 이상 있어야 유효

    onFormChange(isFormValid);
    onFormValuesChange({ ...values, tags, uploadedImages }); // 폼 값 및 이미지 데이터 전달
  }, [errors, values, tags, uploadedImages, onFormChange, onFormValuesChange]);

  const handleImagesChange = (images) => {
    setUploadedImages(images);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !isComposing &&
      values.productTag.trim() &&
      values.productTag.length <= 5
    ) {
      e.preventDefault();
      if (!tags.includes(values.productTag.trim())) {
        setTags([...tags, values.productTag.trim()]);
      } else {
        alert("이미 존재하는 태그입니다.");
      }
      setValues((prevValues) => ({ ...prevValues, productTag: "" }));
    }
  };

  const handleComposition = (e) => {
    if (e.type === "compositionstart") {
      setIsComposing(true);
    } else if (e.type === "compositionend") {
      setIsComposing(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      {/* 이미지 업로드 */}
      <label htmlFor="productImage" className={styles.labelText}>
        상품 이미지
      </label>
      <ImageUpload onImagesChange={handleImagesChange} />

      {/* 기타 폼 필드 */}
      {/* 상품명 */}
      <label htmlFor="productName" className={styles.labelText}>
        상품명
      </label>
      <input
        type="text"
        className={styles.inputStyle}
        id="productName"
        name="productName"
        placeholder="상품명을 입력해주세요"
        value={values.productName}
        onChange={handleChange}
      />
      {errors.productName && (
        <p className={styles.inputCheck}>{errors.productName}</p>
      )}

      {/* 상품 소개 */}
      <label htmlFor="productIntro" className={styles.labelText}>
        상품 소개
      </label>
      <textarea
        className={styles.inputStyle + " " + styles.textareaStyle}
        id="productIntro"
        name="productIntro"
        placeholder="상품 소개를 입력해주세요"
        value={values.productIntro}
        onChange={handleChange}
      ></textarea>
      {errors.productIntro && (
        <p className={styles.inputCheck}>{errors.productIntro}</p>
      )}

      {/* 판매 가격 */}
      <label htmlFor="productPrice" className={styles.labelText}>
        판매가격
      </label>
      <input
        type="text"
        className={`${styles.inputStyle} ${
          errors.productPrice ? styles.inputError : ""
        }`}
        id="productPrice"
        name="productPrice"
        placeholder="판매 가격을 입력해주세요"
        value={values.productPrice}
        onChange={handleChange}
      />
      {errors.productPrice && (
        <p className={styles.inputCheck}>{errors.productPrice}</p>
      )}

      <label htmlFor="productTag" className={styles.labelText}>
        태그
      </label>
      <input
        type="text"
        className={styles.inputStyle}
        id="productTag"
        name="productTag"
        placeholder="태그를 입력해주세요"
        value={values.productTag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleComposition}
        onCompositionUpdate={handleComposition}
        onCompositionEnd={handleComposition}
      />
      {errors.productTag && (
        <p className={styles.inputCheck}>{errors.productTag}</p>
      )}

      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            #{tag}
            <button
              type="button"
              className={styles.tagClose}
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}

export default CreateForm;
