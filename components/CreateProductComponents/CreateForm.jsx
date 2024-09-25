import React, { useEffect, useState } from "react";
import styles from "./CreateForm.module.css";
import { useValidateForm } from "@/hooks/useValidation";

function CreateForm({ onFormChange, onFormValuesChange }) {
  const initialState = {
    productImage: "",
    productName: "",
    productIntro: "",
    productPrice: "",
    productTag: "",
  };

  const validations = {
    productImage: { required: true },
    productName: { required: true, minLength: 1, maxLength: 10 },
    productIntro: { required: true, minLength: 10, maxLength: 200 },
    productPrice: {
      required: true,
      pattern: /^[0-9]+$/,
    },
    productTag: { maxLength: 5 },
  };

  const { values, errors, handleChange, handleSubmit, setValues } =
    useValidateForm(initialState, validations);

  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      Object.entries(values).every(([key, value]) => {
        if (key === "productTag") return true;
        return value.trim() !== "";
      }) &&
      tags.length > 0 &&
      values.productTag.trim() === "";

    onFormChange(isFormValid);
    onFormValuesChange({ ...values, tags });
  }, [errors, values, tags, onFormChange, onFormValuesChange]);

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
      <label htmlFor="productImage" className={styles.labelText}>
        상품 이미지
      </label>
      <input
        type="text"
        className={`${styles.inputStyle} ${
          errors.productImage ? styles.inputError : ""
        }`}
        id="productImage"
        name="productImage"
        placeholder="이미지 링크를 첨부해주세요."
        value={values.productImage}
        onChange={handleChange}
      />
      {errors.productImage && (
        <p className={styles.inputCheck}>{errors.productImage}</p>
      )}

      <label htmlFor="productName" className={styles.labelText}>
        상품명
      </label>
      <input
        type="text"
        className={`${styles.inputStyle} ${
          errors.productName ? styles.inputError : ""
        }`}
        id="productName"
        name="productName"
        placeholder="상품명을 입력해주세요"
        value={values.productName}
        onChange={handleChange}
      />
      {errors.productName && (
        <p className={styles.inputCheck}>{errors.productName}</p>
      )}

      <label htmlFor="productIntro" className={styles.labelText}>
        상품 소개
      </label>
      <textarea
        className={`${styles.inputStyle} ${
          errors.productIntro ? styles.inputError : ""
        }`}
        id="productIntro"
        name="productIntro"
        placeholder="상품 소개를 입력해주세요"
        value={values.productIntro}
        onChange={handleChange}
      ></textarea>
      {errors.productIntro && (
        <p className={styles.inputCheck}>{errors.productIntro}</p>
      )}

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
        className={`${styles.inputStyle} ${
          errors.productTag ? styles.inputError : ""
        }`}
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
