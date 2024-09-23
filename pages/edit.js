import { useState } from "react";
import styles from "@/styles/PostAndEdit.module.css";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function Post() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const router = useRouter();

  const isValid = !formData.title || !formData.content;
  console.log(isValid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/articles", {
        title: formData.title,
        content: formData.content,
      });

      // 게시글이 성공적으로 생성되면 해당 게시글의 ID 상세 페이지로 이동
      const newArticleId = res.data.id; // 서버에서 반환된 새 게시글 ID
      router.push(`/board/${newArticleId}`);  // 생성된 게시글의 상세 페이지로 이동
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <form className={styles.post} onSubmit={handleSubmit}>
      <div className={styles.titleContainer}>
        <div className={styles.postHeader}>게시글 수정</div>
        <button className={styles.postButton} type="submit" disabled={isValid}>
          수정
        </button>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <div className={styles.inputHeader}>*제목</div>
          <input
            className={styles.inputTitle}
            name="title"
            value={formData.title}
            placeholder="제목을 입력해주세요"
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.input}>
          <div className={styles.inputHeader}>*내용</div>
          <textarea
            className={styles.inputContent}
            name="content"
            value={formData.content}
            placeholder="내용을 입력해주세요"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </form>
  );
}
