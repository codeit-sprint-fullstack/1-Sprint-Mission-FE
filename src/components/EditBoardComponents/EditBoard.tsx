import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import styles from "./EditBoard.module.css";
import { useBoardValidation } from "@/hooks/useBoardValidation";

// EditBoardProps 타입 정의
interface EditBoardProps {
  formData: {
    title: string;
    content: string;
    images: UploadedImage[];
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      images: UploadedImage[];
    }>
  >;
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

// 업로드 이미지 타입 정의
interface UploadedImage {
  file: File | null;
  previewUrl: string;
  isExisting: boolean;
  isDeleted: boolean;
}

export default function EditBoard({
  formData,
  setFormData,
  setFormValid,
}: EditBoardProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  // 초기 상태 정의
  const initialBoardState: { title: string; content: string } = {
    title: formData.title || "",
    content: formData.content || "",
  };

  // useBoardValidation 훅 사용
  const { values, errors, handleChange, setValues } =
    useBoardValidation(initialBoardState);

  // 폼 유효성 확인 및 상태 설정
  useEffect(() => {
    const isFormValid =
      typeof values.title === "string" &&
      values.title.trim() !== "" &&
      typeof values.content === "string" &&
      values.content.trim() !== "" &&
      Object.values(errors).every((error) => !error) &&
      uploadedImages.some((img) => !img.isDeleted);

    setFormValid(isFormValid);
  }, [values, errors, uploadedImages, setFormValid]);

  // formData가 변경될 때 폼 초기화
  useEffect(() => {
    if (formData) {
      setValues({
        title: formData.title,
        content: formData.content,
      });
      const initialUploadedImages =
        formData.images?.map((image) => ({
          ...image,
          isDeleted: image.isDeleted ?? false, // 초기 이미지에 isDeleted 추가
        })) || [];
      setUploadedImages(initialUploadedImages);
    }
  }, [formData, setValues]);

  // 이미지 변경 핸들러 정의
  const handleImagesChange = (images: UploadedImage[]) => {
    const filteredImages = images.filter((img) => !img.isDeleted);
    setUploadedImages(filteredImages);
    setFormData((prev) => ({ ...prev, images: filteredImages }));
  };

  // 입력 필드 변경 핸들러 정의
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(e);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className={styles.createForm}>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel}>*제목</label>
        <input
          className={styles.formInput}
          name="title"
          placeholder="제목을 입력해주세요"
          value={values.title || ""}
          onChange={handleInputChange}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel}>*내용</label>
        <textarea
          className={styles.formInput}
          name="content"
          placeholder="내용을 입력해주세요"
          value={values.content || ""}
          onChange={handleInputChange}
        />
        {errors.content && <p className={styles.error}>{errors.content}</p>}
      </div>

      <ImageUpload
        onImagesChange={handleImagesChange}
        initialImages={uploadedImages}
      />
    </form>
  );
}
