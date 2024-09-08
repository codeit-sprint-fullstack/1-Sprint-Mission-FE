import Favorite from "../components/Favorite";
import { ProductImg } from "../components/ProductImg";
import Date from "../components/Date";
import { POST_PREVIEW } from "../constants/Favorite";
import Profile from "../components/Profile";
import { POST_PREVIEW_PROFILE } from "../constants/Profile";

import style from "./postpreview.module.css";

export function PostPreview({
  title = "게시글 제목",
  imgUrl,
  ownerImgUrl,
  owner = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}) {
  const postPreviewClass = `${style["post-preview"]}`;
  const postPreviewTopBarClass = `flex flex-row justify-between ${style["top-bar"]}`;
  const postPreviewTitleClass = `font-semibold ${style.title}`;
  const postPreviewBottomBarClass = `flex flex-row justify-between ${style["bottom-bar"]}`;
  const postPreviewBottomBarOwnerDateClass = `flex flex-row ${style["bottom-bar-owner-date"]}`;
  const postPreviewBottomBarOwnerClass = `flex flex-row items-center ${style["bottom-bar-owner"]}`;
  const postPreviewBottomOwnerClass = `font-normal ${style["owner-name"]}`;

  return (
    <div className={postPreviewClass}>
      <div className={postPreviewTopBarClass}>
        <div className={postPreviewTitleClass}>{title}</div>
        <ProductImg />
      </div>
      <div className={postPreviewBottomBarClass}>
        <div className={postPreviewBottomBarOwnerDateClass}>
          <div className={postPreviewBottomBarOwnerClass}>
            <Profile type={POST_PREVIEW_PROFILE} />
            <div className={postPreviewBottomOwnerClass}>{owner}</div>
          </div>
          <Date date={createdDate} />
        </div>
        <Favorite
          type={POST_PREVIEW}
          myFavorite={myFavorite}
          favoriteCount={favoriteCount}
        />
      </div>
    </div>
  );
}

export default PostPreview;
