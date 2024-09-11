"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getArticle, getArticleComment } from "@/lib/axios";

import Article from "./Article";
import CommentMaker from "@/app/components/CommentMaker";
import CommentList from "@/app/components/CommentList";

import { ARTICLE } from "@/app/constants/comment";

import style from "./article-detail-client.module.css";

export function ArticleDetailClient({ articleId }) {
  const [title, setTitle] = useState("게시글 제목");
  const [profileImgUrl, setProfileImgUrl] = useState(null); // 아직 사용 안함
  const [name, setName] = useState("작성자");
  const [createDate, setCreateDate] = useState("2024-09-10T00:00:00.000Z");
  const [favorite, setFavorite] = useState(0);
  const [content, setContent] = useState(0);
  const [commentList, setCommentList] = useState([]);

  const btnFrameClass = `flex-row ${style["btn-to-list-frame"]}`;

  const router = useRouter();

  const handleBack = () => {
    // router.back();
  };

  const handleRegistComment = () => {
    getArticleComment(articleId).then((data) => {
      setCommentList(data);
    });
  };

  useEffect(() => {
    getArticle(articleId).then((data) => {
      setTitle(data.title);
      setName(data.user.name);
      setCreateDate(data.createdAt);
      setFavorite(data.favorite);
      setContent(data.content);
    });

    getArticleComment(articleId).then((data) => {
      setCommentList(data);
    });
  }, [articleId]);

  return (
    <>
      <Article
        title={title}
        content={content}
        profileImgUrl={profileImgUrl}
        ownerName={name}
        createdDate={createDate}
        favoriteCount={favorite}
      />
      <div className={style["comment-maker-frame"]}>
        <CommentMaker
          articleId={articleId}
          registComment={handleRegistComment}
        />
      </div>
      <div className={style["comment-list-frame"]}>
        <CommentList list={commentList} />
      </div>
      <div className={btnFrameClass}>
        <button className={style["btn-to-list"]} onClick={handleBack} />
      </div>
    </>
  );
}

export default ArticleDetailClient;
