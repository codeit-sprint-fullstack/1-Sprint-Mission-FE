import React, { useState, useEffect } from "react";
import style from "./ProductEditModal.module.css";
import { updateProduct, uploadImage } from "../api/productApi";
import { getAccessToken } from "../api/authApi";
import ImageUpload from "./ImageUpload";
import { ProductData } from "../api/productApi";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: ProductData;
  onProductUpdate: (updatedProduct: ProductData) => void;
}

// uploadImage를 url 형태로 반환하는 함수
const uploadImageWithUrlFormat = async (
  file: File
): Promise<{ imageUrl: string }> => {
  const response = await uploadImage(file);
  return { imageUrl: response.imageUrl };
};

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  productData,
  onProductUpdate,
}) => {
  const [product, setProduct] = useState<ProductData>({
    ...productData,
    image: productData.image || "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>(
    product.image ? [product.image] : []
  );

  const [tagInput, setTagInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen && productData) {
      setProduct({
        ...productData,
        image: productData.image || "",
      });
      setImageUrls(productData.image ? [productData.image] : []);
    }
  }, [isOpen, productData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim().length > 0) {
      e.preventDefault();
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...(prevProduct.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleDeleteTag = (deleteTag: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags: (prevProduct.tags || []).filter((tag) => tag !== deleteTag),
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProduct(product.id, product);
      onProductUpdate(product);
      alert("상품이 성공적으로 수정되었습니다!");
      onClose();
    } catch (error) {
      setError("상품 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (newImageUrls: string[]) => {
    setImageUrls(newImageUrls);
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: newImageUrls[0],
    }));
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
          <label htmlFor="image">상품 이미지</label>
          <ImageUpload
            setImageUrls={handleImageUpload}
            imageUrls={imageUrls} // 배열로 전달
            uploadApi={uploadImageWithUrlFormat}
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
            value={product.price.toString()}
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
            {(product.tags || []).map((tag, index) => (
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

