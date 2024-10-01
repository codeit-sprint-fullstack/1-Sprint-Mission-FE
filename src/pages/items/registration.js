import React, { useState } from "react";
import { useRouter } from "next/router";
import { createProduct } from "../../api/productApi";
import ImageUpload from "../../components/ImageUpload";
import styles from "../../styles/productRegistration.module.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!name || !description || !price || imageUrls.length === 0) {
        console.error("모든 필드를 입력해야 합니다.");
        return;
      }

      const productData = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        tags: tags,
        images: imageUrls, // 이미지 URL 배열 전송
      };

      console.log("전송할 데이터:", productData);

      const result = await createProduct(productData, accessToken);

      if (result && result.id) {
        router.push(`/items`);
      } else {
        console.error("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("상품 등록 중 오류가 발생했습니다:", error);
    }
  };

  const handleDeleteTag = (deleteTag) => {
    setTags(tags.filter((t) => t !== deleteTag));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && tag.trim().length > 0 && tag.trim().length <= 5) {
      e.preventDefault();
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2>상품 등록하기</h2>
        <button type="submit" className={styles.submitButton}>
          등록
        </button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="images">상품 이미지</label>
        <ImageUpload setImageUrls={setImageUrls} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품명을 입력해주세요"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상품 소개를 입력해주세요"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">판매 가격</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="판매 가격을 입력해주세요"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">태그</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleTagKeyPress}
          placeholder="태그를 입력 후 Enter를 누르세요"
        />
        <div className={styles.tags}>
          {tags.map((t, index) => (
            <div key={index} className={styles.tag}>
              <span>#{t}</span>
              <button type="button" onClick={() => handleDeleteTag(t)}>
                <img
                  src="/image/delete_round.svg"
                  alt="Delete Round Icon"
                  className={styles.roundIcon}
                />
                <img
                  src="/image/delete.svg"
                  alt="Delete Icon"
                  className={styles.deleteIcon}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Registration;

