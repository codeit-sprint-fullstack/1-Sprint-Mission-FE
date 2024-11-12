import Image from "next/image";
import Link from "next/link";

import Favorite from "../components/Favorite";
import Date from "../components/Date";
import { BEST_POST } from "../constants/Favorite";
import { ProductImg } from "../components/ProductImg";

import style from "./best-post.module.css";

export function BestPost({
  postId,
  name = "게시글 제목",
  imgUrl,
  nickname = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}: {
  postId: string;
  name: string;
  imgUrl: string;
  nickname: string;
  myFavorite: boolean;
  favoriteCount: number;
  createdDate: Date;
}) {
  const bestPostClass = `${style["best-post"]}`;
  const bestPostContentClass = `${style.content}`;
  const badgeFrameClass = `${style["badge-frame"]}`;
  const badgeImgClass = `${style["badge-img"]}`;
  const postMainClass = `flex flex-row justify-between ${style["post-main"]}`;
  const postNameClass = `font-semibold ${style["post-name"]}`;
  const postBottomBarClass = `flex flex-row justify-between items-center ${style["post-bottom-bar"]}`;
  const postBottomNicknameClass = `flex items-center font-normal text-gray-600 align-middle ${style["post-bottom-nickname"]}`;

  const handleClickPost = () => {};
  // console.log("BestPost postId : ", postId);
  const link = `/bulletin-board/${postId}`;

  return (
    <Link href={link}>
      <div className={bestPostClass}>
        <div className={bestPostContentClass}>
          <div className={badgeFrameClass}>
            <img className={badgeImgClass} alt="베스트 게시글 마크" />
          </div>
          <div className={postMainClass}>
            <div className={postNameClass}>{name}</div>
            <ProductImg />
          </div>
          <div className={postBottomBarClass}>
            <div className="flex flex-row">
              <div className={postBottomNicknameClass}>{nickname}</div>
              <Favorite
                type={BEST_POST}
                myFavorite={myFavorite}
                favoriteCount={favoriteCount}
                objectId={postId}
              />
            </div>
            <Date dbDate={createdDate} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BestPost;
