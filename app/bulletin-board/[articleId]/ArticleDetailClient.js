import Link from "next/link";
import classNames from "classnames";
import { getPost } from "@/lib/api-post";

import Article from "./Article";
import CommentSection from "@/app/components/CommentSection";

import style from "./article-detail-client.module.css";

export async function ArticleDetailClient({ articleId }) {
  const btnFrameClass = classNames(
    "flex",
    "flex-row",
    "content",
    "h-4.8rem",
    "mt-btn-to-list-frame-mt",
    "mb-btn-to-list-frame-mb"
  );
  const linkClass = classNames("my-0", "mx-auto");
  const btnToBulletinBoardClass = classNames(
    "w-btn-to-list",
    "h-btn-to-list",
    style["btn-to-list"]
  );

  const postData = await getPost(articleId);

  const title = postData.title;
  const profileImgUrl = postData.user.image;
  const nickname = postData.user.nickname;
  const createDate = postData.createdAt;
  const favorite = postData.favorite;
  const content = postData.content;

  return (
    <>
      <Article
        articleId={articleId}
        title={title}
        content={content}
        profileImgUrl={profileImgUrl}
        nickname={nickname}
        createdDate={createDate}
        favoriteCount={favorite}
      />
      <CommentSection postId={articleId} />
      <div className={btnFrameClass}>
        <Link href="/bulletin-board" className={linkClass}>
          <button className={btnToBulletinBoardClass} />
        </Link>
      </div>
    </>
  );
}

export default ArticleDetailClient;
