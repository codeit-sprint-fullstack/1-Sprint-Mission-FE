import Image from "next/image";

import Favorite from "../components/Favorite";
import Date from "../components/Date";
import { BEST_POST } from "../constants/Favorite";
import { ProductImg } from "../components/ProductImg";

import style from "./bestpost.module.css";

export function BestPost({
  title = "게시글 제목",
  imgUrl,
  owner = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}) {
  const bestPostClass = `${style.bestpost}`;
  const bestPostContentClass = `${style.content}`;
  const badgeFrameClass = `${style["badge-frame"]}`;
  const badgeImgClass = `${style["badge-img"]}`;
  const postMainClass = `flex flex-row justify-between ${style["post-main"]}`;
  const postTitleClass = `font-semibold ${style["post-title"]}`;
  const postBottomBarClass = `flex flex-row justify-between items-center ${style["post-bottom-bar"]}`;
  const postBottomOwnerClass = `flex items-center font-normal text-gray-600 align-middle ${style["post-bottom-name"]}`;

  const createdDateText = createdDate;

  return (
    <div className={bestPostClass}>
      <div className={bestPostContentClass}>
        <div className={badgeFrameClass}>
          <img className={badgeImgClass} alt="베스트 게시글 마크" />
        </div>
        <div className={postMainClass}>
          <div className={postTitleClass}>{title}</div>
          <ProductImg />
        </div>
        <div className={postBottomBarClass}>
          <div className="flex flex-row">
            <div className={postBottomOwnerClass}>{owner}</div>
            <Favorite
              type={BEST_POST}
              myFavorite={myFavorite}
              favoriteCount={favoriteCount}
            />
          </div>
          <Date date={createdDateText} />
        </div>
      </div>
    </div>
  );
}
