import styles from "./CreateForm.module.css";
import { useValidateForm } from "@/hooks/useValidation";
import { createArticle } from "@/utils/articleApi";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";
import ImageUpload from "./ImageUpload";
import { useState } from "react";

// CreateForm 컴포넌트 정의
export default function CreateForm() {
  // Form 상태 초기화 및 유효성 검사 규칙 정의
  interface FormValues {
    [key: string]: string | string[]; // 인덱스 시그니처 추가 (필수)
    title: string;
    content: string;
  }

  const initialState: FormValues = {
    title: "",
    content: "",
  };

  interface Validations {
    [key: string]: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
    };
  }

  const validations: Validations = {
    title: {
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    content: {
      required: true,
      minLength: 10,
    },
  };

  // 이미지 업로드 상태 정의
  const [uploadedImages, setUploadedImages] = useState<{ file: File }[]>([]);

  // 폼 유효성 검사 관련 훅 사용
  const { values, errors, handleChange, handleSubmit } = useValidateForm(
    initialState,
    validations
  );

  const router = useRouter();

  // 게시글 생성 Mutation 설정
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

  // 이미지 변경 핸들러 정의
  const handleImagesChange = (images: { file: File }[]) => {
    setUploadedImages(images);
  };

  // 폼 제출 핸들러 정의
  const onSubmit = () => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "string") {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // 배열인 경우, 각 요소를 개별적으로 추가
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      }
    });

    uploadedImages.forEach((image) => {
      formData.append("images", image.file);
    });

    mutation.mutate(formData);
  };

  // 폼 유효성 검사
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
          onClick={() => handleSubmit(onSubmit)}
        >
          등록
        </button>
      </div>
      <form id="createForm" className={styles.createForm}>
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
