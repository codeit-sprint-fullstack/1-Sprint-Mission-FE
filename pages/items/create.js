import React, { useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "../../styles/CreateItem.module.css";
import { createProduct } from "../../api/api";

export default function CreateItem() {
  const router = useRouter();

  // 기존의 상태 변수들
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    tags: [],
    images: [], // 이미지 배열 추가
  });

  // 이미지 URL 입력을 위한 상태 변수 추가
  const [imageUrl, setImageUrl] = useState("");

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(`${name} 필드 입력값: ${value}`);
  };

  // 태그 입력 처리 함수
  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
    console.log("태그 입력값:", tags);
  };

  // 이미지 URL 입력 처리 함수
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    console.log("외부 이미지 URL 입력값:", e.target.value);
  };

  // 이미지 URL 추가 함수
  const handleImageUrlAdd = () => {
    if (imageUrl.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
      }));
      console.log("추가된 이미지 URL:", imageUrl.trim());
      setImageUrl("");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // price를 숫자로 변환
    const price = parseFloat(formData.price);

    // 상품 데이터 생성
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price,
      tags: formData.tags,
      images: formData.images, // 이미지 배열을 전송
    };

    console.log("전송할 데이터:", productData); // 실제 전송할 데이터 출력

    try {
      const response = await createProduct(productData);
      console.log("상품 등록 성공:", response);
      router.push("/items");
    } catch (error) {
      console.error(
        "상품 등록 실패:",
        error.response ? error.response.data : error.message
      );
      // 에러 시 백엔드에서 받은 에러 메시지 혹은 기본 에러 메시지 출력
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 상품명 입력 필드 */}
          <div className={styles.formGroup}>
            <label htmlFor="name">상품명</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* 판매가격 입력 필드 */}
          <div className={styles.formGroup}>
            <label htmlFor="price">판매가격</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* 상품 소개 입력 필드 */}
          <div className={styles.formGroup}>
            <label htmlFor="description">상품 소개</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* 태그 입력 필드 */}
          <div className={styles.formGroup}>
            <label htmlFor="tags">태그</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={handleTagChange}
              placeholder="쉼표로 구분하여 입력"
            />
          </div>

          {/* 이미지 URL 입력 필드 추가 */}
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">외부 이미지 URL</label>
            <div className={styles.imageUrlInput}>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="https://pbs.twimg.com/profile_images/1597309336350380033/ub7VkPLo_400x400.jpg "
              />
              <button type="button" onClick={handleImageUrlAdd}>
                추가
              </button>
            </div>
          </div>

          {/* 등록 버튼 */}
          <button type="submit" className={styles.submitButton}>
            등록
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
