import Link from "next/link";

import Favorite from "../components/Favorite";
import { ProductImg } from "../components/ProductImg";
import Date from "../components/Date";
import { ARTICLE_PREVIEW } from "../constants/Favorite";
import Profile from "../components/Profile";
import { PROFILE_H24 } from "../constants/Profile";

import style from "./article-preview.module.css";

export function ArticlePreview({
  articleId,
  title = "게시글 제목",
  imgUrl,
  profileImgUrl,
  nickname = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}) {
  const articlePreviewClass = `${style["article-preview"]}`;
  const articlePreviewTopBarClass = `flex flex-row justify-between ${style["top-bar"]}`;
  const articlePreviewTitleClass = `font-semibold ${style.title}`;
  const articlePreviewBottomBarClass = `flex flex-row justify-between ${style["bottom-bar"]}`;
  const articlePreviewBottomBarNicknameDateClass = `flex flex-row items-center ${style["bottom-bar-nickname-date"]}`;
  const articlePreviewBottomNicknameClass = `font-normal ${style["nickname-name"]}`;

  console.log("ArticlePreview articleId : ", articleId);
  const link = `/bulletin-board/${articleId}`;

  return (
    <Link href={link}>
      <div className={articlePreviewClass}>
        <div className={articlePreviewTopBarClass}>
          <div className={articlePreviewTitleClass}>{title}</div>
          <ProductImg />
        </div>
        <div className={articlePreviewBottomBarClass}>
          <div className={articlePreviewBottomBarNicknameDateClass}>
            <Profile type={PROFILE_H24} profileImgUrl={profileImgUrl} />
            <div className={articlePreviewBottomNicknameClass}>{nickname}</div>

            <Date dbDate={createdDate} />
          </div>
          <Favorite
            type={ARTICLE_PREVIEW}
            myFavorite={myFavorite}
            favoriteCount={favoriteCount}
          />
        </div>
      </div>
    </Link>
  );
}

export default ArticlePreview;
