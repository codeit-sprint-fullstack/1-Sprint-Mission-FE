import Image from "next/image";

import Profile from "@/app/components/Profile";
import Date from "@/app/components/Date";
import Favorite from "@/app/components/Favorite";
import { ARTICLE_DETAIL } from "@/app/constants/Favorite";
import { PROFILE_H40 } from "@/app/constants/Profile";
import { DATE } from "@/app/constants/date";
import DropDownKebabArticle from "@/app/components/DropDownKebabArticle";

import style from "./article.module.css";

function Owner({ middleBarOwnerClass, nickname }) {
  return <p className={middleBarOwnerClass}>{nickname}</p>;
}

function Divider({ dividerClass }) {
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
  const topBarClass = `flex flex-row justify-between ${style["top-bar"]}`;
  const topBarTextClass = `font-bold ${style["top-bar-text"]}`;
  const middleBarClass = `flex flex-row items-center ${style["middle-bar"]}`;
  const middleBarOwnerDateSetClass = `flex flex-row items-center ${style["middle-bar-owner-data-set"]}`;
  const middleBarOwnerClass = `font-medium ${style["middle-bar-owner"]}`;
  const dividerClass = `flex flex-row items-center justify-center ${style.divider}`;
  const contentClass = `font-normal ${style.content}`;

  return (
    <div className={style.article}>
      <div className={topBarClass}>
        <div className={topBarTextClass}>{title}</div>
        <DropDownKebabArticle articleId={articleId} />
      </div>
      <div className={middleBarClass}>
        <Profile type={PROFILE_H40} profileImgUrl={profileImgUrl} />
        <div className={middleBarOwnerDateSetClass}>
          <Owner dividerClass={middleBarOwnerClass} nickname={nickname} />
          <Date type={DATE} dbDate={createdDate} />
        </div>
        <Divider dividerClass={dividerClass} />
        <Favorite type={ARTICLE_DETAIL} favoriteCount={favoriteCount} />
      </div>
      <div className={contentClass}>{content} </div>
    </div>
  );
}

export default Article;
