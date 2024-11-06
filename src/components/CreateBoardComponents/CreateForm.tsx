import styles from "./CreateForm.module.css";
import { createArticle } from "@/utils/articleApi";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { useBoardValidation } from "@/hooks/useBoardValidation";

interface FormValues {
  title: string;
  content: string;
  images: string[];
}

export default function CreateForm() {
  const initialState: FormValues = {
    title: "",
    content: "",
    images: [],
  };

  // useBoardValidation 훅 사용
  const { values, errors, handleChange, setValues } =
    useBoardValidation(initialState);

  const [uploadedImages, setUploadedImages] = useState<{ file: File }[]>([]);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createArticle(formData),
    onSuccess: (newArticle: { id: number }) => {
      if (newArticle && newArticle.id) {
        router.push(ROUTES.ARTICLE(newArticle.id));
      }
    },
    onError: (error: Error) => {
      console.error("Error creating article:", error);
    },
  });

  const handleImagesChange = (images: { file: File }[]) => {
    setUploadedImages(images);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작 차단

    // 폼 데이터를 생성하여 서버에 제출
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    uploadedImages.forEach((image) => {
      formData.append("images", image.file);
    });
    mutation.mutate(formData);
  };

  const isFormValid =
    typeof values.title === "string" &&
    values.title.trim() !== "" &&
    typeof values.content === "string" &&
    values.content.trim() !== "" &&
    Object.values(errors).every((error) => !error);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>게시글 쓰기</h2>
        <button
          type="button"
          className={styles.addBtn}
          disabled={!isFormValid}
          onClick={onSubmit}
        >
          등록
        </button>
      </div>
      <form id="createForm" className={styles.createForm} onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="title">
            *제목
          </label>
          <input
            className={styles.formInput}
            name="title"
            placeholder="제목을 입력해주세요"
            value={values.title}
            onChange={handleChange}
            id="title"
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="content">
            *내용
          </label>
          <textarea
            className={styles.formInput}
            name="content"
            placeholder="내용을 입력해주세요"
            value={values.content}
            onChange={handleChange}
            id="content"
          />
          {errors.content && <p className={styles.error}>{errors.content}</p>}
        </div>
        <ImageUpload onImagesChange={handleImagesChange} />
      </form>
    </div>
  );
}
