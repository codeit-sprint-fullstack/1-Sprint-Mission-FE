import React, { useState, useEffect } from "react";
import style from "./ProductEditModal.module.css";
import { updateProduct } from "../api/productApi";
import { getAccessToken } from "../api/authApi";

const ProductEditModal = ({
  isOpen,
  onClose,
  productData,
  onProductUpdate,
}) => {
  const [product, setProduct] = useState({
    name: productData?.name || "",
    description: productData?.description || "",
    price: productData?.price || "",
    tags: productData?.tags || [],
    images: productData?.images || [], // 이미지 배열로 설정
  });

  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && productData) {
      setProduct({
        name: productData.name || "",
        description: productData.description || "",
        price: productData.price || "",
        tags: productData.tags || [],
        images: productData.images || [],
      });
    }
  }, [isOpen, productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim().length > 0) {
      e.preventDefault();
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...prevProduct.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleDeleteTag = (deleteTag) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags: prevProduct.tags.filter((tag) => tag !== deleteTag),
    }));
  };

  const handleSave = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await updateProduct(
        productData.id,
        {
          ...product,
          images: product.images, // 이미지 배열로 전송
        },
        accessToken
      );
      onProductUpdate(product); // 성공 시 부모 컴포넌트에 업데이트된 데이터를 넘김
      alert("상품이 성공적으로 수정되었습니다!");
      onClose();
    } catch (error) {
      setError("상품 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.modalHeader}>
          <h2>상품 수정</h2>
          <button onClick={onClose} className={style.closeButton}>
            닫기
          </button>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="imageUrl">외부 이미지 URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.images[0] || ""}
            onChange={(e) =>
              setProduct({ ...product, images: [e.target.value] })
            } // 이미지 배열로 업데이트
            placeholder="이미지 URL을 입력해주세요"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="name">상품명</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="description">상품 소개</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="price">판매 가격</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해주세요"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="tag">태그</label>
          <input
            type="text"
            id="tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="태그를 입력 후 Enter를 누르세요"
          />
          <div className={style.tags}>
            {product.tags.map((tag, index) => (
              <div key={index} className={style.tag}>
                <span>{tag}</span>
                <button type="button" onClick={() => handleDeleteTag(tag)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={style.saveButton}
          >
            {isLoading ? "저장 중..." : "수정하기"}
          </button>
          <button onClick={onClose} className={style.cancelButton}>
            취소
          </button>
        </div>

        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ProductEditModal;

