"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getArticle } from "@/lib/axios";

export function ArticleDetailClient({ articleId }) {
  const [title, setTitle] = useState("게시글 제목");
  const [profileImgUrl, setProfileImgUrl] = useState(); // 아직 사용 안함
  const [name, setName] = useState("작성자");
  const [createDate, setCreateDate] = useState("2024-09-10T00:00:00.000Z");
  const [favorite, setFavorite] = useState(0);
  const [content, setContent] = useState(0);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    getArticle(articleId).then((data) => {
      setTitle(data.title);
      setName(data.user.name);
      setCreateDate(data.createdAt);
      setFavorite(data.favorie);
      setContent(data.content);
    });
  }, [articleId]);

  return (
    <div>
      <div>{articleId}</div>
      <button onClick={handleBack}>뒤로 가기</button>
    </div>
  );
}

export default ArticleDetailClient;
