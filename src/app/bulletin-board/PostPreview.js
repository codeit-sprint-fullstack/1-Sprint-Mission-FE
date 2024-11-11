import Link from "next/link";

import Favorite from "../components/Favorite";
import { ProductImg } from "../components/ProductImg";
import Date from "../components/Date";
import { POST_PREVIEW } from "../constants/Favorite";
import Profile from "../components/Profile";
import { PROFILE_H24 } from "../constants/Profile";

import style from "./post-preview.module.css";

export function PostPreview({
  postId,
  name = "게시글 제목",
  imgUrl,
  profileImgUrl,
  nickname = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}) {
  const postPreviewClass = `${style["post-preview"]}`;
  const postPreviewTopBarClass = `flex flex-row justify-between ${style["top-bar"]}`;
  const postPreviewNameClass = `font-semibold ${style.name}`;
  const postPreviewBottomBarClass = `flex flex-row justify-between ${style["bottom-bar"]}`;
  const postPreviewBottomBarNicknameDateClass = `flex flex-row items-center ${style["bottom-bar-nickname-date"]}`;
  const postPreviewBottomNicknameClass = `font-normal ${style["nickname-name"]}`;

  console.log("PostPreview postId : ", postId);
  const link = `/bulletin-board/${postId}`;

  return (
    <Link href={link}>
      <div className={postPreviewClass}>
        <div className={postPreviewTopBarClass}>
          <div className={postPreviewNameClass}>{name}</div>
          <ProductImg />
        </div>
        <div className={postPreviewBottomBarClass}>
          <div className={postPreviewBottomBarNicknameDateClass}>
            <Profile type={PROFILE_H24} profileImgUrl={profileImgUrl} />
            <div className={postPreviewBottomNicknameClass}>{nickname}</div>

            <Date dbDate={createdDate} />
          </div>
          <Favorite
            type={POST_PREVIEW}
            myFavorite={myFavorite}
            favoriteCount={favoriteCount}
          />
        </div>
      </div>
    </Link>
  );
}

export default PostPreview;
