import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./ImageUpload.module.css";
import Image from "next/image";

// 업로드 이미지 타입 정의
interface UploadedImage {
  file: File | null;
  previewUrl: string;
  isExisting: boolean;
}

interface ImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  initialImages?: UploadedImage[];
}

const ImageUpload = ({
  onImagesChange,
  initialImages = [],
}: ImageUploadProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경 시 부모 컴포넌트에 변경 사항 전달하는 함수
  const handleImagesChange = useCallback(
    (updatedImages: UploadedImage[]) => {
      onImagesChange(updatedImages);
    },
    [onImagesChange]
  );

  // 초기 이미지 설정
  useEffect(() => {
    if (initialImages.length > 0 && images.length === 0) {
      const formattedImages = initialImages.map((image) => ({
        file: null,
        previewUrl: image.previewUrl,
        isExisting: true,
      }));

      setImages(formattedImages);
      handleImagesChange(formattedImages);
    }
  }, [initialImages, images.length, handleImagesChange]);

  // 파일 선택 시 이미지 추가 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > 3) {
      alert("최대 3개까지 이미지를 선택할 수 있습니다.");
      return;
    }

    const newImages: UploadedImage[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      isExisting: false,
    }));

    const updatedImages = [...images, ...newImages].slice(0, 3);
    setImages(updatedImages);
    handleImagesChange(updatedImages);
  };

  // 이미지 삭제 처리
  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    handleImagesChange(updatedImages);
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
