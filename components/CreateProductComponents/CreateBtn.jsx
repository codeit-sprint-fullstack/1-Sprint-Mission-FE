import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CreateBtn.module.css";
import CreateForm from "./CreateForm.jsx";
import { createProduct } from "@/utils/productApi";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

export default function CreateBtn() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      router.push(ROUTES.ITEMS_DETAIL(newProduct.product.id));
    },
    onError: (error) => {
      console.error("Failed to create product:", error.response || error);
    },
  });

  const handleProductPost = async () => {
    if (!isFormValid) return;

    try {
      const formData = new FormData();

      if (formValues.uploadedImages && formValues.uploadedImages.length > 0) {
        formValues.uploadedImages.forEach((image, index) => {
          console.log(image);
          formData.append("images", image.file);
        });
      }
      formValues.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      formData.append("name", formValues.productName);
      formData.append("description", formValues.productIntro);
      formData.append("price", formValues.productPrice);

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
