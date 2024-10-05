import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import SmallButton from "@/components/common/SmallButton.jsx";
import styles from "./index.module.css";
import usePostMutation from "@/hooks/usePostMutation";
import { fetchPost } from "@/utils/communityAPI";
import { useAuth } from "@/hooks/useAuth";

export default function WriteOrEditArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [touched, setTouched] = useState({ title: false, content: false });
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

  const { user, loading } = useAuth();

  const { data: articleData, isLoading: isArticleLoading } = useQuery(
    ["article", id],
    () => fetchPost(id),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        setTitle(data.title);
        setContent(data.content);
      },
    }
  );

  const onSuccess = () => {
    router.push("/community");
  };

  const onError = (error) => {
    console.error(
      `게시글 ${isEditing ? "수정" : "등록"}에 실패했습니다:`,
      error
    );
    alert(
      `게시글 ${
        isEditing ? "수정" : "등록"
      }에 실패했습니다. 다시 시도해 주세요.`
    );
  };

  const { mutate, isLoading: isMutationLoading } = usePostMutation(
    isEditing ? "updatePost" : "createPost",
    onSuccess,
    onError
  );

  useEffect(() => {
    setIsFormValid(title.trim() !== "" && content.trim() !== "");
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid && user) {
      mutate({
        id: isEditing ? id : undefined,
        title,
        content,
        userId: user.id,
      });
    } else if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    } else {
      setTouched({ title: true, content: true });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  if (loading || (isEditing && isArticleLoading)) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return (
      <div>
        로그인이 필요합니다. <a href="/login">로그인 하러 가기</a>
      </div>
    );
  }

  return (
    <main className={styles.writeContainer}>
      <div className={styles.writeHeadHug}>
        <h1 className={styles.writeHeadText}>
          {isEditing ? "게시글 수정" : "게시글 쓰기"}
        </h1>
        <SmallButton
          disabled={!isFormValid || isMutationLoading}
          onClick={handleSubmit}
        >
          {isMutationLoading
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
