import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CreateBtn.module.css";
import CreateForm from "./CreateForm";
import { createProduct } from "@/utils/productApi";
import { ROUTES } from "@/utils/rotues";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Product } from "@/types/Types";

// FormValues 타입 정의
interface FormValues {
  uploadedImages?: { file: File }[];
  tags: string[];
  productName: string;
  productIntro: string;
  productPrice: string;
}

// createProduct가 반환하는 데이터 타입 정의
interface CreateProductResponse {
  product: Product;
}

// CreateBtn 컴포넌트 정의
export default function CreateBtn() {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    uploadedImages: [],
    tags: [],
    productName: "",
    productIntro: "",
    productPrice: "",
  });

  const router = useRouter();

  // 상품 생성 Mutation 설정
  const mutation: UseMutationResult<
    CreateProductResponse,
    any,
    FormData,
    unknown
  > = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: (newProductResponse: CreateProductResponse) => {
      const newProduct = newProductResponse.product;
      router.push(ROUTES.ITEMS_DETAIL(newProduct.id));
    },
    onError: (error: any) => {
      console.error("Failed to create product:", error.response || error);
    },
  });

  // 상품 생성 핸들러 정의
  const handleProductPost = async () => {
    if (!isFormValid) return;

    try {
      const formData = new FormData();

      if (formValues.uploadedImages && formValues.uploadedImages.length > 0) {
        formValues.uploadedImages.forEach((image) => {
          formData.append("images", image.file);
        });
      }

      formValues.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      formData.append("name", formValues.productName);
      formData.append("description", formValues.productIntro);
      formData.append("price", formValues.productPrice.toString());

      mutation.mutate(formData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addBar}>
        <p className={styles.textStyleHead}>상품 등록하기</p>
        <button
          className={`${styles.addBtn} ${
            isFormValid ? styles.addBtnActive : ""
          }`}
          disabled={!isFormValid}
          onClick={handleProductPost}
        >
          등록
        </button>
      </div>
      <CreateForm
        onFormChange={setIsFormValid}
        onFormValuesChange={setFormValues}
      />
    </div>
  );
}
