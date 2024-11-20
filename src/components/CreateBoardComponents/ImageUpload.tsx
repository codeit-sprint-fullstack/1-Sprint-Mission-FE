import React, { useState, useRef, ChangeEvent } from "react";
import styles from "./ImageUpload.module.css";
import Image from "next/image";
import { CreateUploadedImage } from "@/types/Types";

// Props 타입 정의
interface ImageUploadProps {
  onImagesChange: (images: CreateUploadedImage[]) => void;
}

// ImageUpload 컴포넌트 정의
const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<CreateUploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 파일 변경 핸들러 정의
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // 이미지 개수 제한
    if (files.length + images.length > 3) {
      alert("최대 3개까지 이미지를 선택할 수 있습니다.");
      return;
    }

    // 새로운 이미지 객체 생성 및 상태 업데이트
    const newImages: CreateUploadedImage[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...newImages].slice(0, 3);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  // 이미지 삭제 핸들러 정의
  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className={styles.imageUploadContainer}>
      <div className={styles.imageGrid}>
        <div className={styles.imageItem}>
          <label htmlFor="imageInput" className={styles.imageLabel}>
            <div className={styles.imageUploadBox}>이미지 등록</div>
            <input
              type="file"
              id="imageInput"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {images.map((image, index) => (
          <div key={index} className={styles.imageItem}>
            <Image
              src={image.previewUrl}
              alt={`미리보기 ${index + 1}`}
              className={styles.imagePreview}
              width={150}
              height={150}
            />
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleImageDelete(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
