import React, { useEffect, useState } from "react";
import styles from "./CreateForm.module.css";
import { useProductValidation } from "@/hooks/useValidation";
import ImageUpload from "./ImageUpload";
import { FormValues } from "@/types/Types";

interface CreateFormProps {
  onFormChange: (isValid: boolean) => void;
  onFormValuesChange: (
    values: FormValues & { tags: string[]; uploadedImages: { file: File }[] }
  ) => void;
}

function CreateForm({ onFormChange, onFormValuesChange }: CreateFormProps) {
  const initialState: FormValues = {
    productName: "",
    productIntro: "",
    productPrice: "",
  };

  const { values, errors, handleChange, setValues } =
    useProductValidation(initialState);

  const [tags, setTags] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<{ file: File }[]>([]); // 이미지 상태 추가
  const [tagInputValue, setTagInputValue] = useState<string>(""); // 태그 입력 상태 추가

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      typeof values.productName === "string" &&
      values.productName.trim() !== "" &&
      typeof values.productIntro === "string" &&
      values.productIntro.trim() !== "" &&
      typeof values.productPrice === "string" &&
      values.productPrice.trim() !== "" &&
      tags.length > 0 &&
      uploadedImages.length > 0;

    // 전달하는 객체가 FormValues와 추가 필드를 모두 포함하도록 수정
    onFormChange(isFormValid);
    onFormValuesChange({
      ...values,
      tags,
      uploadedImages,
    }); // 폼 값 및 이미지 데이터 전달
  }, [errors, values, tags, uploadedImages, onFormChange, onFormValuesChange]);

  const handleImagesChange = (images: { file: File }[]) => {
    setUploadedImages(images);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      !isComposing &&
      tagInputValue.trim() &&
      tags.length < 5
    ) {
      e.preventDefault();
      if (!tags.includes(tagInputValue.trim())) {
        setTags([...tags, tagInputValue.trim()]);
      } else {
        alert("이미 존재하는 태그입니다.");
      }
      setTagInputValue(""); // 입력 필드 초기화
    }
  };

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === "compositionstart") {
      setIsComposing(true);
    } else if (e.type === "compositionend") {
      setIsComposing(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form className={styles.productForm}>
      <label htmlFor="productImage" className={styles.labelText}>
        상품 이미지
      </label>
      <ImageUpload onImagesChange={handleImagesChange} />

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

      {/* 태그 입력 */}
      <label htmlFor="productTag" className={styles.labelText}>
        태그
      </label>
      <input
        type="text"
        className={styles.inputStyle}
        id="productTag"
        name="productTag"
        placeholder="태그를 입력해주세요"
        value={tagInputValue}
        onChange={handleTagInputChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleComposition}
        onCompositionUpdate={handleComposition}
        onCompositionEnd={handleComposition}
      />
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
