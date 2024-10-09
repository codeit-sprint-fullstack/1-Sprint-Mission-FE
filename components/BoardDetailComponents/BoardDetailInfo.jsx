import styles from "./BoardDetailInfo.module.css";
import { useState } from "react";
import { deleteArticle, addLike, removeLike } from "@/utils/articleApi";
import { useRouter } from "next/router";
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";
import ic_active_favorite from "@/images/ic_active_favorite.png";
import ic_empty_favorite from "@/images/ic_empty_favorite.png";

export default function BoardDetailInfo({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isItemFavorite, setIsItemFavorite] = useState(
    article?.isLiked || false
  );
  const [isFavoriteCount, setIsFavoriteCount] = useState(
    article?.likeCount || 0
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const mutation = useMutation({
    mutationFn: (id) => deleteArticle(id),
    onSuccess: () => {
      router.push(ROUTES.BOARD);
    },
    onError: (error) => {
      console.error("Error deleting article:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(article.id);
  };

  const addFavoriteMutate = useMutation({
    mutationFn: (id) => addLike(id),
    onSuccess: () => {
      setIsItemFavorite(true);
      setIsFavoriteCount(isFavoriteCount + 1);
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  const removeFavoriteMutate = useMutation({
    mutationFn: (id) => removeLike(id),
    onSuccess: () => {
      setIsItemFavorite(false);
      setIsFavoriteCount(isFavoriteCount - 1);
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  const handleFavoriteToggle = () => {
    if (isItemFavorite) {
      removeFavoriteMutate.mutate(article.id);
    } else {
      addFavoriteMutate.mutate(article.id);
    }
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{article.title}</p>
        <Image
          src={kebab}
          alt="kebab"
          className={styles.kebabImg}
          onClick={toggleDropdown}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <Link href={ROUTES.BOARD_EDIT(article.id)}>
            <div className={styles.dropdownItem}>수정하기</div>
          </Link>
          <div className={styles.dropdownItem} onClick={handleDelete}>
            삭제하기
          </div>
        </div>
      )}
      <div className={styles.userInfoContainer}>
        <Image src={profile} alt="profile" className={styles.profileImg} />
        <p className={styles.user}>{article.writer.nickname}</p>
        <p className={styles.date}>
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <p className={styles.divider}>|</p>
        <div className={styles.favoriteInfo}>
          <Image
            className={styles.ic_favorite}
            src={isItemFavorite ? ic_active_favorite : ic_empty_favorite}
            alt={isItemFavorite ? "active favorite" : "empty favorite"}
            onClick={handleFavoriteToggle}
          />
          <p className={styles.favorite}>{isFavoriteCount}</p>
        </div>
      </div>
      <hr className={styles.line} />
      <p className={styles.content}>{article.content}</p>
    </div>
  );
}
