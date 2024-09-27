// components/ProductOptions.js

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductOptions.module.css";

const ProductOptions = ({ product, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    tags: product.tags.join(", "),
  });

  const handleOptionsToggle = () => {
    setShowOptions((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleSaveClick = () => {
    const updatedProduct = {
      ...editedProduct,
      tags: editedProduct.tags.split(",").map((tag) => tag.trim()),
    };
    onEdit(product.id, updatedProduct);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      tags: product.tags.join(", "),
    });
  };

  return (
    <div className={styles.productOptions}>
      <button onClick={handleOptionsToggle} className={styles.optionsButton}>
        <Image src="/ic_kebab.png" alt="옵션" width={20} height={20} />
      </button>
      {showOptions && (
        <div className={styles.optionsPopup}>
          <button onClick={handleEditClick}>수정하기</button>
          <button onClick={() => onDelete(product.id)}>삭제하기</button>
        </div>
      )}

      {isEditing && (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editedProduct.name}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
            placeholder="상품 이름"
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: Number(e.target.value),
              })
            }
            placeholder="가격"
          />
          <textarea
            value={editedProduct.description}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                description: e.target.value,
              })
            }
            placeholder="상품 설명"
          />
          <input
            type="text"
            value={editedProduct.tags}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, tags: e.target.value })
            }
            placeholder="태그 (쉼표로 구분)"
          />
          <div className={styles.editActions}>
            <button onClick={handleSaveClick}>저장</button>
            <button onClick={handleCancelClick}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
