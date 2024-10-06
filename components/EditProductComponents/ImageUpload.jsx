import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ImageUpload.module.css";
import Image from "next/image";

const ImageUpload = ({ onImagesChange, initialImages = [] }) => {
  const url = "https://thrift-shop.onrender.com";
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // `onImagesChange` 함수를 useCallback으로 감싸서 참조가 고정되도록 설정
  const handleImagesChange = useCallback(
    (updatedImages) => {
      onImagesChange(updatedImages);
    },
    [onImagesChange]
  );

  useEffect(() => {
    // 초기 이미지 설정
    if (initialImages.length > 0 && images.length === 0) {
      const formattedImages = initialImages.map((image) => ({
        file: null, // 기존 이미지이므로 File 객체는 null로 설정
        previewUrl:
          typeof image.previewUrl === "object" && image.previewUrl.url
            ? image.previewUrl.url // previewUrl 객체 내부의 url 값 사용
            : image.previewUrl, // previewUrl이 이미 문자열이라면 그대로 사용
      }));

      setImages(formattedImages);
      handleImagesChange(formattedImages);
    }
  }, [initialImages, images.length, handleImagesChange]); // images.length를 의존성에 추가하여 상태 초기화 제어

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 3) {
      alert("최대 3개까지 이미지를 선택할 수 있습니다.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...newImages].slice(0, 3);
    setImages(updatedImages);
    handleImagesChange(updatedImages);
  };

  const handleImageDelete = (index) => {
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
              src={
                image.previewUrl.startsWith("blob:")
                  ? image.previewUrl
                  : url + image.previewUrl
              }
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
