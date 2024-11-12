import Image from "next/image";
import classNames from "classnames";

import Profile from "src/app/components/Profile";
import Date from "src/app/components/Date";
import Favorite from "src/app/components/Favorite";
import { POST_DETAIL } from "src/app/constants/Favorite";
import { PROFILE_H40 } from "src/app/constants/Profile";
import DropDownKebabPost from "src/app/components/DropDownKebabPost";

import style from "./post.module.css";

function Owner({ nickname }: { nickname: string }) {
  const middleBarOwnerClass = classNames(
    "h-2.4rem",
    "text-md",
    "leading-24",
    "font-medium",
    "text-gray-600"
  );

  return <p className={middleBarOwnerClass}>{nickname}</p>;
}

function Divider() {
  const dividerClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "justify-center",
    style.divider
  );

  // 임시로 Image tag의 width, height 설정. Divider의 구조나 frame css 수정에 따라 변경 고려
  return (
    <div className={dividerClass}>
      <Image src="/images/divider_h40.svg" width={2} height={34} alt="분리" />
    </div>
  );
}

export function Post({
  postId,
  name,
  content,
  profileImgUrl,
  nickname,
  createdDate,
  favoriteCount,
}: {
  postId: string;
  name: string;
  content: string;
  profileImgUrl: string;
  nickname: string;
  createdDate: string;
  favoriteCount: number;
}) {
  const postClass = classNames(
    "content",
    "mb-3.2rem",
    "tablet:mb-4rem",
    "mobile:mb-1.6rem"
  );
  const topBarClass = classNames(
    "content",
    "flex",
    "flex-row",
    "justify-between"
  );
  const topBarTextClass = classNames(
    "text-xl",
    "leading-32",
    "font-bold",
    "text-gray-800"
  );
  const middleBarClass = classNames(
    "content",
    "h-post-middle-bar",
    "flex",
    "flex-row",
    "items-center",
    "gap-1.6rem",
    "border-b-1",
    "border-b-gray-300"
  );
  const middleBarOwnerDateSetClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "gap-0.8rem",
    "mobile:gap-0.2rem"
  );
  const contentClass = classNames("content", "font-normal", style.content);

  return (
    <div className={postClass}>
      <div className={topBarClass}>
        <div className={topBarTextClass}>{name}</div>
        <DropDownKebabPost postId={postId} />
      </div>
      <div className={middleBarClass}>
        <Profile type={PROFILE_H40} profileImgUrl={profileImgUrl} />
        <div className={middleBarOwnerDateSetClass}>
          <Owner nickname={nickname} />
          <Date dbDate={createdDate} />
        </div>
        <Divider />
        <Favorite
          type={POST_DETAIL}
          favoriteCount={favoriteCount}
          objectId={postId}
        />
      </div>
      <div className={contentClass}>{content} </div>
    </div>
  );
}

export default Post;
