import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./ImageUpload.module.css";
import Image from "next/image";

// UploadedImage 타입 정의
interface UploadedImage {
  file: File | null;
  previewUrl: string;
  isExisting: boolean;
  isDeleted: boolean;
}

// ImageUploadProps 타입 정의
interface ImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  initialImages?: UploadedImage[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  initialImages = [],
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 변경 시 부모 컴포넌트에 변경 사항 전달하는 함수
  const handleImagesChange = useCallback(
    (updatedImages: UploadedImage[]) => {
      onImagesChange(updatedImages.filter((img) => !img.isDeleted)); // 삭제되지 않은 이미지만 부모 컴포넌트로 전달
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
        isDeleted: false,
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
      isDeleted: false,
    }));

    const updatedImages = [...images, ...newImages].slice(0, 3);
    setImages(updatedImages);
    handleImagesChange(updatedImages);
  };

  // 이미지 삭제 처리
  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index); // 삭제한 이미지를 리스트에서 제외
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
