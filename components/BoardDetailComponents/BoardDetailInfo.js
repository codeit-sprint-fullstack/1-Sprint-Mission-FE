import styles from "./BoardDetailInfo.module.css";
import { useState } from "react";
import { deleteArticle } from "@/utils/articleApi";
import { useRouter } from "next/router"; // router 추가
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import Link from "next/link";

export default function BoardDetailInfo({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // useRouter 훅 사용

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id); // 게시글 삭제 API 호출
      router.push("/board"); // 삭제 후 게시글 목록으로 이동
    } catch (error) {
      console.error("Error deleting article:", error);
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
          <Link href="/board/edit/[id]" as={`/board/edit/${article.id}`}>
            <div className={styles.dropdownItem}>수정하기</div>
          </Link>
          <div
            className={styles.dropdownItem}
            onClick={() => handleDelete(article.id)}
          >
            삭제하기
          </div>
        </div>
      )}
      <div className={styles.userInfoContainer}>
        <Image src={profile} alt="profile" className={styles.profileImg} />
        <p className={styles.user}>총명한 판다</p>
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
