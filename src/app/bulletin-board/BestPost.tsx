import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

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
  createdDate: string;
}) {
  const bestPostClass = classNames(
    "w-[38.4rem]",
    "h-[16.9rem]",
    "bg-alabaster",
    "box-border",
    "rounded-[0.8rem]",
    "ta:w-[34rem]",
    "ta:h-[19.8rem]",
    "mo:w-[34.3rem]",
    "mo:h-[19.8rem]"
  );
  const bestPostContentClass = classNames(
    "w-[33.6rem]",
    "h-[15.3rem]",
    "my-0",
    "mx-auto",
    "ta:w-[29.2rem]",
    "ta:h-[18.2rem]",
    "mo:w-[29.5rem]",
    "mo:h-[18.2rem]"
  );
  const badgeFrameClass = classNames("w-[10rem]", "h-[3rem]", "relative");
  const postMainClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "w-full",
    "h-[7.2rem]",
    "mt-[1.6rem]"
  );
  const postNameClass = classNames(
    "font-semibold",
    "w-[25.6rem]",
    "h-full",
    "text-[2rem]",
    "leading-[3.2rem]",
    "ta:w-[18rem]",
    "mo:w-[18.3rem]",
    "ta:text-[1.8rem]",
    "mo:text-[1.8rem]",
    "ta:leading-[2.6rem]",
    "mo:leading-[2.6rem]"
  );
  const postBottomBarClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "items-center",
    "w-full",
    "h-[2.4rem]",
    "mt-[1.8rem]",
    "ta:mt-[4rem]",
    "mo:mt-[4rem]"
  );
  const postBottomNicknameClass = classNames(
    "flex",
    "items-center",
    "font-normal",
    "text-gray-600",
    "align-middle",
    "mr-[0.8rem]",
    "text-[1.4rem]"
  );

  const handleClickPost = () => {};
  // console.log("BestPost postId : ", postId);
  const link = `/bulletin-board/${postId}`;

  return (
    <Link href={link}>
      <div className={bestPostClass}>
        <div className={bestPostContentClass}>
          <div className={badgeFrameClass}>
            <Image
              src={"/images/img_badge.svg"}
              alt="베스트 게시글 마크"
              fill
            />
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
