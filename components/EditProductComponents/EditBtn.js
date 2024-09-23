import React, { useState } from "react";
import { useRouter } from "next/router"; // useRouter로 변경
import styles from "./EditBtn.module.css"; // CSS 모듈 사용
import EditForm from "./EditForm";
import { editProduct } from "@/utils/productApi";
import { ROUTES } from "@/utils/rotues";

export default function EditBtn({ item }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const router = useRouter(); // useNavigate 대신 useRouter

  const handleProductPost = async (id) => {
    if (isFormValid) {
      try {
        await editProduct(id, {
          name: formValues.productName,
          description: formValues.productIntro,
          price: formValues.productPrice,
          tags: formValues.tags || [],
          images: ["https://example.com/..."],
        });
        router.push(ROUTES.ITEMS_DETAIL(id));
      } catch (error) {
        console.error("Failed to create product:", error);
      }
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
          onClick={() => handleProductPost(item.id)}
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
