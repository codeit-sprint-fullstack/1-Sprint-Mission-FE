import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./EditBtn.module.css";
import EditForm from "./EditForm";
import { editProduct } from "@/utils/productApi";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

export default function EditBtn({ item }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const mutation = useMutation({
    mutationFn: (id) =>
      editProduct(
        id,
        {
          name: formValues.productName,
          description: formValues.productIntro,
          price: formValues.productPrice,
          tags: formValues.tags || [],
          images: formValues.productImage,
        },
        token
      ),
    onSuccess: () => {
      router.push(ROUTES.ITEMS_DETAIL(item.id));
    },
    onError: (error) => {
      console.error("Failed to edit product:", error);
    },
  });

  const handleProductPost = () => {
    if (isFormValid) {
      mutation.mutate(item.id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addBar}>
        <p className={styles.textStyleHead}>상품 수정하기</p>
        <button
          className={`${styles.addBtn} ${
            isFormValid ? styles.addBtnActive : ""
          }`}
          disabled={!isFormValid}
          onClick={handleProductPost}
        >
          수정
        </button>
      </div>
      <EditForm
        onFormChange={setIsFormValid}
        onFormValuesChange={setFormValues}
        item={item}
      />
    </div>
  );
}
