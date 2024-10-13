"use client";

import { FormProvider, useForm } from "react-hook-form";
import styles from "./ProductForm.module.scss";
import Input from "./comm/Input";
import TextArea from "./comm/TextArea";
import Button from "../ui/Button";
import { useEffect } from "react";
import { PRODUCT } from "@/variables/formValidation";
import TagInput from "./comm/TagInput";
import InputFile from "./comm/InputFile";
import { useState } from "react";

export default function ProductForm({
  onSubmit,
  isEditMode = false,
  initialData = {},
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heading = isEditMode ? "상품 수정하기" : "상품 등록하기";

  const formMethods = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      tags: initialData?.tags || [],
      imageFiles: [],
      imageUrls: initialData?.images || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  //수정하기면 폼 데이터 prefill
  useEffect(() => {
    if (isEditMode && initialData) {
      reset({
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData?.price || 0,
        tags: initialData?.tags || [],
        imageFiles: [],
        imageUrls: initialData?.images || "",
      });
    }
  }, [reset, isEditMode, initialData]);

  //submit 후 form reset
  const handleResetAfterSubmit = (data) => {
    if (data) {
      console.log("data right before the submit", data);
      onSubmit(data);
      setIsSubmitted(true);
      reset();
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleResetAfterSubmit)}
        className={styles.ProductForm}
      >
        <div className={styles["top-bar"]}>
          <h1>{heading}</h1>
          <Button type="submit" variant="primary" disabled={!isValid}>
            등록
          </Button>
        </div>
        <p className={styles["file-input-label"]}>상품 이미지</p>
        <InputFile
          name="images"
          initialImages={initialData.images}
          isSubmit={isSubmitted}
        />
        <Input label="상품명" name="name" validations={PRODUCT.NAME} />
        <TextArea
          label="상품소개"
          name="description"
          validations={PRODUCT.DESCRIPTION}
        />
        <Input
          label="판매가격"
          name="price"
          validations={PRODUCT.PRICE}
          type="number"
        />

        <TagInput name="tags" label="태그" />
      </form>
    </FormProvider>
  );
}
