import Link from "next/link";
import classNames from "classnames";
import { getPost } from "@/lib/api-post";

import Article from "./Article";
import PostCommentSection from "./PostCommentSection";

export default async function ArticlePage({ params }) {
  const { articleId } = params;
  const mainClass = classNames("content", "main");

  // const btnFrameClass = classNames("content", "btn-to-list-frame");
  // const linkClass = classNames("my-0", "mx-auto");

  // const postData = await getPost(articleId);

  // const title = postData.title;
  // const profileImgUrl = postData.user.image;
  // const nickname = postData.user.nickname;
  // const createDate = postData.createdAt;
  // const favorite = postData.favorite;
  // const content = postData.content;

  return (
    <div className={mainClass}>
      <div>articleId : {articleId}</div>
      <div>sprint10 진행 중 DB/BE 변경</div>
      {/* <Article
        articleId={articleId}
        title={title}
        content={content}
        profileImgUrl={profileImgUrl}
        nickname={nickname}
        createdDate={createDate}
        favoriteCount={favorite}
      />
      <PostCommentSection postId={articleId} />
      <div className={btnFrameClass}>
        <Link href="/bulletin-board" className={linkClass}>
          <button className={"btn-to-list"} />
        </Link>
      </div> */}
    </div>
  );
}
