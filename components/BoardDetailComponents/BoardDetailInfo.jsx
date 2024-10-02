import styles from "./BoardDetailInfo.module.css";
import { useState } from "react";
import { deleteArticle } from "@/utils/articleApi";
import { useRouter } from "next/router";
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

export default function BoardDetailInfo({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
        <p className={styles.user}>총명한 판다{article.id}</p>
        <p className={styles.date}>
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <p className={styles.divider}>|</p>
        <p className={styles.favorite}>♡ {article.favorite}</p>
      </div>
      <p className={styles.content}>{article.content}</p>
    </div>
  );
}
