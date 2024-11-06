import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./EditBtn.module.css";
import EditForm from "./EditForm";
import { editProduct } from "@/utils/productApi";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

// EditBtnProps 타입 정의
interface EditBtnProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    tags: string[];
    images: string[];
  };
}

export default function EditBtn({ item }: EditBtnProps) {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({});
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      editProduct(id, formData),
    onSuccess: () => {
      router.push(ROUTES.ITEMS_DETAIL(item.id));
    },
    onError: (error: any) => {
      console.error("Failed to edit product:", error);
    },
  });

  const handleProductPost = () => {
    if (!isFormValid) return;

    try {
      const formData = new FormData();

      (formValues.uploadedImages || []).forEach((image: any) => {
        if (!image.isExisting) {
          formData.append("images", image.file);
        } else {
          formData.append("existingImages", image.previewUrl);
        }
      });

      (formValues.tags || []).forEach((tag: string) => {
        formData.append("tags[]", tag);
      });

      formData.append("name", formValues.productName);
      formData.append("description", formValues.productIntro);
      formData.append("price", formValues.productPrice);

      mutation.mutate({ id: item.id, formData });
    } catch (error) {
      console.error("Error editing product:", error);
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
