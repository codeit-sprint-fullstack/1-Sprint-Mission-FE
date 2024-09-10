import Favorite from "../components/Favorite";
import { ProductImg } from "../components/ProductImg";
import Date from "../components/Date";
import { ARTICLE_PREVIEW } from "../constants/Favorite";
import Profile from "../components/Profile";
import { PROFILE_H24 } from "../constants/Profile";

import style from "./article-preview.module.css";

export function ArticlePreview({
  title = "게시글 제목",
  imgUrl,
  ownerImgUrl,
  owner = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}) {
  const articlePreviewClass = `${style["article-preview"]}`;
  const articlePreviewTopBarClass = `flex flex-row justify-between ${style["top-bar"]}`;
  const articlePreviewTitleClass = `font-semibold ${style.title}`;
  const articlePreviewBottomBarClass = `flex flex-row justify-between ${style["bottom-bar"]}`;
  const articlePreviewBottomBarOwnerDateClass = `flex flex-row ${style["bottom-bar-owner-date"]}`;
  const articlePreviewBottomBarOwnerClass = `flex flex-row items-center ${style["bottom-bar-owner"]}`;
  const articlePreviewBottomOwnerClass = `font-normal ${style["owner-name"]}`;

  return (
    <div className={articlePreviewClass}>
      <div className={articlePreviewTopBarClass}>
        <div className={articlePreviewTitleClass}>{title}</div>
        <ProductImg />
      </div>
      <div className={articlePreviewBottomBarClass}>
        <div className={articlePreviewBottomBarOwnerDateClass}>
          <div className={articlePreviewBottomBarOwnerClass}>
            <Profile type={PROFILE_H24} />
            <div className={articlePreviewBottomOwnerClass}>{owner}</div>
          </div>
          <Date date={createdDate} />
        </div>
        <Favorite
          type={ARTICLE_PREVIEW}
          myFavorite={myFavorite}
          favoriteCount={favoriteCount}
        />
      </div>
    </div>
  );
}

export default ArticlePreview;
