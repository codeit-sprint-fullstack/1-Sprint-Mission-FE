import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CreateBtn.module.css";
import CreateForm from "./CreateForm";
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
      router.push(ROUTES.ITEMS_DETAIL(newProduct.id));
    },
    onError: (error) => {
      console.error("Failed to create product:", error.response || error);
    },
  });

  const handleProductPost = () => {
    if (isFormValid) {
      const productData = {
        images: formValues.productImage,
        name: formValues.productName,
        description: formValues.productIntro,
        price: formValues.productPrice,
        tags: formValues.tags || [],
      };

      console.log("Sending data to server:", productData);

      mutation.mutate(productData);
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
