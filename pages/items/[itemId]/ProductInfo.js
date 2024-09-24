import React, { useState, useEffect, memo } from "react";
import KebabMenu from "@/components/postDetail/KebabMenu";
import styles from "./index.module.css";

const ProductInfo = memo(
  ({
    product,
    isEditing,
    editedProduct,
    setEditedProduct,
    handleSave,
    kebabMenuOptions,
  }) => {
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
      if (editedProduct && editedProduct.tags) {
        setTagInput(editedProduct.tags.join(", "));
      }
    }, [editedProduct]);

    const handleTagInputChange = (e) => {
      setTagInput(e.target.value);
    };

    const handleTagInputBlur = () => {
      const trimmedTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setEditedProduct((prev) => ({
        ...prev,
        tags: trimmedTags,
      }));
    };

    return (
      <div className={styles.productInfo}>
        <div className={styles.productHeadHug}>
          <div className={styles.productTitleKebabHug}>
            <div className={styles.productName}>
              {isEditing ? (
                <input
                  className={styles.editInput}
                  type="text"
                  value={editedProduct?.name || ""}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      name: e.target.value,
                    })
                  }
                  aria-label="상품 이름 수정"
                />
              ) : (
                product.name
              )}
            </div>
            <KebabMenu options={kebabMenuOptions} />
          </div>
          <p className={styles.productPrice}>
            {isEditing ? (
              <input
                className={styles.editInput}
                type="text"
                value={editedProduct?.price || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                  })
                }
                aria-label="상품 가격 수정"
              />
            ) : (
              `${product.price.toLocaleString()}원`
            )}
          </p>
        </div>
        <div className={styles.descriptionHug}>
          <p className={styles.sectionHeadText}>상품 소개</p>
          {isEditing ? (
            <textarea
              className={styles.editInput}
              value={editedProduct?.description || ""}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
              aria-label="상품 설명 수정"
            />
          ) : (
            <p className={styles.productDescription}>{product.description}</p>
          )}
        </div>
        <div className={styles.tagHug}>
          <div className={styles.sectionHeadText}>상품 태그</div>
          <div className={styles.tagList}>
            {isEditing ? (
              <input
                className={styles.editInput}
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onBlur={handleTagInputBlur}
                placeholder="태그를 쉼표로 구분하여 입력해주세요"
                aria-label="상품 태그 수정"
              />
            ) : (
              product.tags.map((tag, index) => (
                <span key={index} className={styles.productTags}>
                  #{tag}
                </span>
              ))
            )}
            {isEditing && (
              <button onClick={handleSave} className={styles.editButton}>
                저장하기
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
