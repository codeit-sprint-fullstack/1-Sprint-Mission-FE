import Link from "next/link";
import classNames from "classnames";
import { getPost } from "src/lib/api-post";

import Post from "./Post";
import PostCommentSection from "./PostCommentSection";

interface PostPageParams {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostPageParams) {
  const { postId } = params;
  const mainClass = classNames("content", "main");

  // const btnFrameClass = classNames("content", "btn-to-list-frame");
  // const linkClass = classNames("my-0", "mx-auto");

  // const postData = await getPost(postId);

  // const name = postData.name;
  // const profileImgUrl = postData.user.image;
  // const nickname = postData.user.nickname;
  // const createDate = postData.createdAt;
  // const favorite = postData.favorite;
  // const content = postData.content;

  return (
    <div className={mainClass}>
      <div>postId : {postId}</div>
      <div>sprint10 진행 중 DB/BE 변경</div>
      {/* <Post
        postId={postId}
        name={name}
        content={content}
        profileImgUrl={profileImgUrl}
        nickname={nickname}
        createdDate={createDate}
        favoriteCount={favorite}
      />
      <PostCommentSection postId={postId} />
      <div className={btnFrameClass}>
        <Link href="/bulletin-board" className={linkClass}>
          <button className={"btn-to-list"} />
        </Link>
      </div> */}
    </div>
  );
}
