import Image from "next/image";
import styles from "./ItemInfo.module.css";
import defaultImage from "@/images/img_default.png";
import { formatPrice } from "@/utils/price";
import { addFavorite, removeFavorite, deleteProduct } from "@/utils/productApi";
import ic_profile from "@/images/ic_profile.png";
import ic_active_favorite from "@/images/ic_active_favorite.png";
import ic_empty_favorite from "@/images/ic_empty_favorite.png";
import ic_kebab from "@/images/ic_kebab.png";
import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Modal from "../ModalComponents/Modal";
import { ROUTES } from "@/utils/rotues";
import Link from "next/link";

export default function ItemInfo(product) {
  const item = product.product;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemFavorite, setIsItemFavorite] = useState(
    item?.isFavorite || false
  );
  const [isFavoriteCount, setIsFavoriteCount] = useState(
    item?.favoriteCount || 0
  );

  const isAuthenticated = useAuth(item.ownerId);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleDelete = async () => {
    await deleteProduct(item.id);
    router.push(ROUTES.ITEMS);
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isItemFavorite) {
        await removeFavorite(item.id);
        setIsItemFavorite(false);
        setIsFavoriteCount(isFavoriteCount - 1);
      } else {
        await addFavorite(item.id);
        setIsItemFavorite(true);
        setIsFavoriteCount(isFavoriteCount + 1);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className={styles.itemContainer}>
      <img
        className={styles.itemImg}
        src={item.images?.[0] || defaultImage}
        alt="productImage"
      />
      <div className={styles.infoContainer}>
        <div className={styles.infoName}>
          <p className={styles.itemName}>{item.name}</p>
          {isAuthenticated && (
            <Image
              className={styles.kebab}
              src={ic_kebab}
              onClick={toggleDropdown}
              alt="kebab"
            />
          )}
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            <Link href={ROUTES.ITEMS_EDIT(item.id)}>
              <div className={styles.dropdownItem}>수정하기</div>
            </Link>
            <div className={styles.dropdownItem} onClick={openModal}>
              삭제하기
            </div>
          </div>
        )}
        <p className={styles.itemPrice}>{`${formatPrice(item.price)}원`}</p>
        <hr className={styles.itemHr} />
        <p className={styles.itemDescription}> 상품 소개</p>
        <p className={styles.descriptionText}>{item.description}</p>
        <p className={styles.itemTag}>상품 태그</p>
        <div className={styles.tagsContainer}>
          {item.tags.map((tag) => (
            <span key={tag} className={styles.tagText}>
              #{tag}
            </span>
          ))}
        </div>
        <div className={styles.userContainer}>
          <Image
            src={ic_profile}
            className={styles.profile}
            alt="profile image"
          />
          <div>
            <p className={styles.ownerId}>{item.ownerNickname}</p>
            <p className={styles.createdAt}>
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className={styles.favorite}>
            <div className={styles.favoriteInfo}>
              <Image
                className={styles.ic_favorite}
                src={isItemFavorite ? ic_active_favorite : ic_empty_favorite}
                alt={isItemFavorite ? "active favorite" : "empty favorite"}
                onClick={handleFavoriteToggle}
              />
              <p className={styles.favoriteCount}>{isFavoriteCount}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          text="정말로 상품을 삭제하시겠어요?"
          onConfirm={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
