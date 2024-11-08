import React, { useRef } from "react";
import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  uploadApi: (file: File) => Promise<{ imageUrl: string }>;
}

const ImageUpload = ({ imageUrls = [], setImageUrls, uploadApi }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files.length + imageUrls.length > 3) {
      alert("최대 3개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const newImageUrls = [...imageUrls];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const response = await uploadApi(file);
        newImageUrls.push(response.imageUrl);
        setImageUrls(newImageUrls);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  return (
    <div className={styles.imageUploadWrapper}>
      {Array.isArray(imageUrls) &&
        imageUrls.map((url, index) => (
          <div key={index} className={styles.imagePreviewContainer}>
            <img
              src={url}
              alt={`uploaded-${index}`}
              className={styles.imagePreview}
            />
            <div className={styles.imageDeleteWrapper}>
              <img
                src="/image/image_round.svg"
                alt="round icon"
                className={styles.imageRound}
              />
              <img
                src="/image/image_delete.svg"
                alt="delete icon"
                onClick={() => handleDeleteImage(index)}
                className={styles.imageDelete}
              />
            </div>
          </div>
        ))}

      {imageUrls.length < 3 && (
        <label className={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
          />
          <img
            src="/image/image_plus.svg"
            alt="이미지 추가"
            className={styles.uploadIcon}
          />
          <span className={styles.uploadText}>이미지 등록</span>
        </label>
      )}
    </div>
  );
};

export default ImageUpload;

