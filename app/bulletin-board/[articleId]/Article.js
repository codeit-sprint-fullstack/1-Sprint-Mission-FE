import Image from "next/image";
import classNames from "classnames";

import Profile from "@/app/components/Profile";
import Date from "@/app/components/Date";
import Favorite from "@/app/components/Favorite";
import { ARTICLE_DETAIL } from "@/app/constants/Favorite";
import { PROFILE_H40 } from "@/app/constants/Profile";
import DropDownKebabArticle from "@/app/components/DropDownKebabArticle";

import style from "./article.module.css";

function Owner({ nickname }) {
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

export function Article({
  articleId,
  title,
  content,
  profileImgUrl,
  nickname,
  createdDate,
  favoriteCount,
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
        <div className={topBarTextClass}>{title}</div>
        <DropDownKebabArticle articleId={articleId} />
      </div>
      <div className={middleBarClass}>
        <Profile type={PROFILE_H40} profileImgUrl={profileImgUrl} />
        <div className={middleBarOwnerDateSetClass}>
          <Owner nickname={nickname} />
          <Date dbDate={createdDate} />
        </div>
        <Divider />
        <Favorite type={ARTICLE_DETAIL} favoriteCount={favoriteCount} />
      </div>
      <div className={contentClass}>{content} </div>
    </div>
  );
}

export default Article;
