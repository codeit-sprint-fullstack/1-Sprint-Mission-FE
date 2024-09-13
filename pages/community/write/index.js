import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import SmallButton from "@/components/common/SmallButton.jsx";
import styles from "./index.module.css";

const postOrUpdateArticle = async ({ id, title, content, isEditing }) => {
  const url = isEditing ? `/api/community/posts/${id}` : "/api/community/posts";
  const method = isEditing ? "PUT" : "POST";

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      author_name: "익명의 판다",
    }),
  });

  if (!response.ok)
    throw new Error(`게시글 ${isEditing ? "수정" : "등록"}에 실패했습니다`);
  return response.json();
};

const fetchArticle = async (id) => {
  const response = await fetch(`/api/community/posts/${id}`);
  if (!response.ok) throw new Error("게시글을 불러오는데 실패했습니다");
  return response.json();
};

export default function WriteOrEditArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [touched, setTouched] = useState({ title: false, content: false });
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

  const { data: articleData, isLoading: isArticleLoading } = useQuery(
    ["article", id],
    () => fetchArticle(id),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        setTitle(data.title);
        setContent(data.content);
      },
    }
  );

  const mutation = useMutation(postOrUpdateArticle, {
    onSuccess: () => {
      console.log(
        `게시글이 성공적으로 ${isEditing ? "수정" : "등록"}되었습니다.`
      );
      router.push("/community");
    },
    onError: (error) => {
      console.error(
        `게시글 ${isEditing ? "수정" : "등록"}에 실패했습니다:`,
        error
      );
      alert(
        `게시글 ${
          isEditing ? "수정" : "등록"
        }에 실패했습니다. 다시 시도해 주세요.`
      );
    },
  });

  useEffect(() => {
    setIsFormValid(title.trim() !== "" && content.trim() !== "");
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      mutation.mutate({
        id,
        title,
        content,
        isEditing,
      });
    } else {
      setTouched({ title: true, content: false });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  if (isEditing && isArticleLoading) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <main className={styles.writeContainer}>
      <div className={styles.writeHeadHug}>
        <h1 className={styles.writeHeadText}>
          {isEditing ? "게시글 수정" : "게시글 쓰기"}
        </h1>
        <SmallButton
          disabled={!isFormValid || mutation.isLoading}
          onClick={handleSubmit}
        >
          {mutation.isLoading
            ? `${isEditing ? "수정" : "등록"} 중...`
            : isEditing
            ? "수정"
            : "등록"}
        </SmallButton>
      </div>
      <div className={styles.inputAreaHug}>
        <div>
          <div className={styles.writeHeadText}>*제목</div>
          <input
            className={`${styles.writeTitleInput} ${
              touched.title && !title.trim() ? styles.errorInput : ""
            }`}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur("title")}
          />
          {touched.title && !title.trim() && (
            <div className={styles.errorMessage}>제목을 입력해주세요.</div>
          )}
        </div>
        <div>
          <div className={styles.writeHeadText}>*내용</div>
          <textarea
            className={`${styles.writeContentsInput} ${
              touched.content && !content.trim() ? styles.errorInput : ""
            }`}
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => handleBlur("content")}
          />
          {touched.content && !content.trim() && (
            <div className={styles.errorMessage}>내용을 입력해주세요.</div>
          )}
        </div>
      </div>
    </main>
  );
}
