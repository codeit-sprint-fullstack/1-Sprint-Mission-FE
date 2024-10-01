import React, { useState, useRef } from "react";
import { uploadImage } from "../api/productApi";
import styles from "./ImageUpload.module.css";

const ImageUpload = ({ setImageUrls }) => {
  const [uploadImgUrls, setUploadImgUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length + uploadImgUrls.length > 3) {
      alert("최대 3개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const newImageUrls = [...uploadImgUrls];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // 서버로 이미지 파일 업로드 및 URL 반환
        const response = await uploadImage(file);
        newImageUrls.push(response.url); // 서버에서 반환된 이미지 URL 추가
        setUploadImgUrls(newImageUrls);
        setImageUrls(newImageUrls); // 부모 컴포넌트로 이미지 URL 전달
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    const newImageUrls = uploadImgUrls.filter((_, i) => i !== index);
    setUploadImgUrls(newImageUrls);
    setImageUrls(newImageUrls); // 부모 컴포넌트로 업데이트된 이미지 URL 전달
  };

  return (
    <div className={styles.imageUploadWrapper}>
      {uploadImgUrls.map((url, index) => (
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
              className={styles.imageDelete}
              onClick={() => handleDeleteImage(index)}
            />
          </div>
        </div>
      ))}

      {uploadImgUrls.length < 3 && (
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

