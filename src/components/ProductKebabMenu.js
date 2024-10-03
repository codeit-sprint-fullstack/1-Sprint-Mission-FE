import React, { useState, useRef, useEffect } from "react";
import { deleteProduct } from "../api/productApi";
import { getAccessToken } from "../api/authApi";
import DeleteModal from "./DeleteModal";
import styles from "./ProductKebabMenu.module.css";

const ProductKebabMenu = ({
  productId,
  productData,
  onEdit,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKebabClick = () => {
    setShowMenu(!showMenu);
  };

  const handleConfirmDelete = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      await deleteProduct(productId, accessToken);
      alert("상품이 삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("상품 삭제 중 오류가 발생했습니다:", error);
      alert("상품 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container} ref={menuRef}>
      <img
        src="/image/kebab.svg"
        alt="Kebab Icon"
        className={styles.kebabIcon}
        onClick={handleKebabClick}
      />
      {showMenu && (
        <div className={styles.kebabMenu}>
          <div className={styles.menuItem} onClick={onEdit}>
            상품 수정
          </div>
          <div
            className={styles.menuItem}
            onClick={() => setShowDeleteModal(true)}
          >
            상품 삭제
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ProductKebabMenu;

