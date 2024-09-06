import styles from "./BoardDetailInfo.module.css";
import { useState } from "react";
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import Link from "next/link";

export default function BoardDetailInfo({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://thrift-shop.onrender.com/articles/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.push("/board");
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <>
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
              <div className={styles.dropdownItem}>수정하기</div>
            </Link>
            <Link href="/board/">
              <div
                className={styles.dropdownItem}
                onClick={() => handleDelete(article.id)}
              >
                삭제하기
              </div>
            </Link>
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
    </>
  );
}
