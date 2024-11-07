import React, { useEffect, useState } from "react";
import styles from "./EditForm.module.css";
import { useProductValidation } from "@/hooks/useValidation";
import ImageUpload from "./ImageUpload";
import { Product, UploadedImage } from "@/types/Types";

interface EditFormProps {
  onFormChange: (isValid: boolean) => void;
  onFormValuesChange: (values: {
    productName: string;
    productIntro: string;
    productPrice: string;
    tags: string[];
    uploadedImages: {
      file: File | null;
      previewUrl: string;
      isExisting: boolean;
      isDeleted: boolean;
    }[];
  }) => void;
  item: Product;
}

export default function EditForm({
  onFormChange,
  onFormValuesChange,
  item,
}: EditFormProps) {
  // Initial form state definition
  const initialFormState: {
    productName: string;
    productIntro: string;
    productPrice: string;
  } = {
    productName: item.name || "",
    productIntro: item.description || "",
    productPrice: String(item.price) || "",
  };

  // Use custom validation hook for product form
  const { values, errors, handleChange, setValues } =
    useProductValidation(initialFormState);

  // Local state for managing tags and uploaded images
  const [tags, setTags] = useState<string[]>(item.tags || []);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    item.images.map((imageUrl) => ({
      file: null,
      previewUrl: imageUrl,
      isExisting: true,
      isDeleted: false,
    }))
  ); // 이미지 상태 추가
  const [tagInputValue, setTagInputValue] = useState<string>("");

  // Form validity checker and value updater
  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      values.productName.trim() !== "" &&
      values.productIntro.trim() !== "" &&
      values.productPrice.trim() !== "" &&
      tags.length > 0 &&
      tags.length <= 5 &&
      uploadedImages.some((img) => !img.isDeleted);

    // Filter out deleted images for formValues update
    const validImages = uploadedImages.filter((img) => !img.isDeleted);

    onFormChange(isFormValid);
    onFormValuesChange({
      ...values,
      tags,
      uploadedImages: validImages,
    }); // 폼 값 및 이미지 데이터 전달
  }, [errors, values, tags, uploadedImages, onFormChange, onFormValuesChange]);

  // Tag addition handler (for pressing Enter)
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

  // Handle IME composition events for accurate tagging
  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === "compositionstart") {
      setIsComposing(true);
    } else if (e.type === "compositionend") {
      setIsComposing(false);
    }
  };

  // Tag removal handler
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Image change handler
  const handleImagesChange = (images: UploadedImage[]) => {
    setUploadedImages(images);
  };

  return (
    <form className={styles.productForm}>
      <ImageUpload
        onImagesChange={handleImagesChange}
        initialImages={uploadedImages}
      />

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
        className={`${styles.inputStyle} ${styles.textareaStyle} ${
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

      <label htmlFor="tags" className={styles.labelText}>
        태그
      </label>
      <input
        type="text"
        className={`${styles.inputStyle}`}
        id="tags"
        name="tags"
        placeholder="태그를 입력해주세요"
        value={tagInputValue}
        onChange={(e) => setTagInputValue(e.target.value)}
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
