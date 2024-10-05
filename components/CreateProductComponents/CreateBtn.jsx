import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CreateBtn.module.css";
import CreateForm from "./CreateForm.jsx"; // CreateForm 컴포넌트 import
import { createProduct, uploadImages } from "@/utils/productApi"; // 이미지 및 상품 등록 API import
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

export default function CreateBtn() {
  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태
  const [formValues, setFormValues] = useState({}); // 폼 값 상태
  const router = useRouter();

  // const mutation = useMutation({
  //   mutationFn: createProduct,
  //   onSuccess: (newProduct) => {
  //     router.push(ROUTES.ITEMS_DETAIL(newProduct.id));
  //   },
  //   onError: (error) => {
  //     console.error("Failed to create product:", error.response || error);
  //   },
  // });

  const handleProductPost = async () => {
    if (!isFormValid) return;

    try {
      let imageUrls = [];
      if (formValues.uploadedImages && formValues.uploadedImages.length > 0) {
        const imageFiles = formValues.uploadedImages.map((img) => img.file);
        imageUrls = await uploadImages(imageFiles);
      }

      console.log(formValues);
      console.log(imageUrls);

      // const productData = {
      //   images: imageUrls,
      //   name: formValues.productName,
      //   description: formValues.productIntro,
      //   price: formValues.productPrice,
      //   tags: formValues.tags || [],
      // };

      //mutation.mutate(productData);
    } catch (error) {
      console.error("Error uploading images or creating product:", error);
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
        onFormChange={setIsFormValid} // 폼 유효성 상태 전달
        onFormValuesChange={setFormValues} // 폼 값 상태 전달
      />
    </div>
  );
}
