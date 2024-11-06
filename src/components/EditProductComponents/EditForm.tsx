import React, { useEffect, useState } from "react";
import styles from "./EditForm.module.css";
import { useValidateForm } from "@/hooks/useValidation";
import ImageUpload from "./ImageUpload";

// 인터페이스 정의
interface EditFormProps {
  onFormChange: (isValid: boolean) => void;
  onFormValuesChange: (values: any) => void;
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    tags: string[];
    images: string[];
  };
}

export default function EditForm({
  onFormChange,
  onFormValuesChange,
  item,
}: EditFormProps) {
  const [uploadedImages, setUploadedImages] = useState<
    { file: File | null; previewUrl: string; isExisting: boolean }[]
  >([]);

  // initialFormState에서 productTag 타입을 배열로 수정
  const initialFormState = {
    productName: "",
    productIntro: "",
    productPrice: "",
    productTag: [] as string[],
    productImage: [] as string[], // 배열로 수정
  };

  const validationRules = {
    productName: { required: true, minLength: 3 },
    productIntro: { required: true, minLength: 10, maxLength: 100 },
    productPrice: { required: true, pattern: /^[0-9]+$/ },
  };

  const { values, errors, handleChange, setValues } = useValidateForm(
    initialFormState,
    validationRules
  );

  const [isComposing, setIsComposing] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      setValues({
        productName: item.name,
        productIntro: item.description,
        productPrice: String(item.price),
        productTag: item.tags || [],
        productImage: item.images,
      });
      const initialUploadedImages = item.images.map((imageUrl) => ({
        file: null,
        previewUrl: imageUrl,
        isExisting: true,
      }));
      setUploadedImages(initialUploadedImages);
    }
  }, [item, setValues]);

  const handleImagesChange = (
    images: { file: File | null; previewUrl: string; isExisting: boolean }[]
  ) => {
    setUploadedImages(images);
  };

  useEffect(() => {
    // 문자열인 경우에만 trim() 사용
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      typeof values.productName === "string" &&
      values.productName.trim() !== "" &&
      typeof values.productIntro === "string" &&
      values.productIntro.trim() !== "" &&
      typeof values.productPrice === "string" &&
      values.productPrice.trim() !== "" &&
      (values.productTag as string[]).length > 0 &&
      uploadedImages.length > 0;

    onFormChange(isFormValid);
    onFormValuesChange({ ...values, uploadedImages });
  }, [errors, values, uploadedImages, onFormChange, onFormValuesChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      !isComposing &&
      e.currentTarget.value.trim() &&
      (values.productTag as string[]).length < 5 // 최대 태그 갯수는 5개
    ) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!(values.productTag as string[]).includes(newTag)) {
        setValues((prevValues) => ({
          ...prevValues,
          productTag: [...(prevValues.productTag as string[]), newTag],
        }));
      } else {
        alert("이미 존재하는 태그입니다.");
      }
      e.currentTarget.value = ""; // 입력 필드 초기화
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
    setValues((prevValues) => ({
      ...prevValues,
      productTag: (prevValues.productTag as string[]).filter(
        (tag) => tag !== tagToRemove
      ),
    }));
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
        value={values.productName as string}
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
        value={values.productIntro as string}
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
        value={values.productPrice as string}
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
        className={`${styles.inputStyle}`}
        id="productTag"
        name="productTag"
        placeholder="태그를 입력해주세요"
        onKeyDown={handleKeyDown}
        onCompositionStart={handleComposition}
        onCompositionUpdate={handleComposition}
        onCompositionEnd={handleComposition}
      />

      <div className={styles.tagsContainer}>
        {(values.productTag as string[]).map((tag, index) => (
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
