import Image from "next/image";
import axios from "@/lib/axios";
import styles from "./KebabDropDown.module.css";
import kebab from "@/images/ic_kebab.png";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ArticleDropDown({ articleId }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  // 게시글 삭제
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/articles/${articleId}`);

      // 삭제 후 게시글 목록으로 리디렉션
      router.push("/board");
    } catch (error) {
      console.error("오류", error);
    }
  };

  return (
    <div className={styles.dropDownContainer}>
      <Image
        className={styles.kebab}
        src={kebab}
        alt="kebab"
        onClick={toggleDropDown}
      />
      {isOpen && (
        <div className={styles.dropDown}>
          <a className={styles.dropDownText}>수정하기</a>
          <a onClick={handleDelete}>삭제하기</a>
        </div>
      )}
    </div>
  );
}
