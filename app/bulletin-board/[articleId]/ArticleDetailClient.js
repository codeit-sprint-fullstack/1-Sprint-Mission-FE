"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getArticle } from "@/lib/axios";

import Article from "./Article";
import CommentMaker from "@/app/components/CommentMaker";
import CommentList from "@/app/components/CommentList";

import { ARTICLE } from "@/app/constants/comment";

import style from "./article-detail-client.module.css";

export function ArticleDetailClient({ articleId }) {
  const [title, setTitle] = useState("게시글 제목");
  const [profileImgUrl, setProfileImgUrl] = useState(); // 아직 사용 안함
  const [name, setName] = useState("작성자");
  const [createDate, setCreateDate] = useState("2024-09-10T00:00:00.000Z");
  const [favorite, setFavorite] = useState(0);
  const [content, setContent] = useState(0);

  const router = useRouter();

  const handleBack = () => {
    // router.back();
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
    <>
      <Article
        title={"임시 article 제목"}
        profileImgUrl={null}
        ownerName={"작성자이름"}
        createdDate={"2024-09-10T00:00:00.000Z"}
        favoriteCount={0}
      />
      <div className={style["comment-maker-frame"]}>
        <CommentMaker articleId={articleId} />
      </div>
      <div className={style["comment-list-frame"]}>
        <CommentList type={ARTICLE} id={articleId} />
      </div>
      <button className={style["btn-to-list"]} onClick={handleBack}>
        목록으로 돌아가기
      </button>
    </>
  );
}

export default ArticleDetailClient;
