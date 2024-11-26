import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import PostPreviewImage from "./PostPreviewImage";
import PostPreviewFavorite from "./PostPreviewFavorite";
import Date from "../components/Date";
import PostUserProfile from "../components/PostUserProfile";

interface PostPreviewProps {
  postId: string;
  name: string;
  img: string;
  ownerImg: string;
  ownerNickname: string;
  isFavorite: boolean;
  favoriteCount: number;
  createdDate: string;
}

export function PostPreview({
  postId,
  name,
  img,
  ownerImg,
  ownerNickname,
  isFavorite,
  favoriteCount,
  createdDate,
}: PostPreviewProps) {
  const link = `/bulletin-board/${postId}`;

  const postPreviewClass = classNames(
    "w-full",
    "h-[13.8rem]",
    "box-border",
    "bg-alabaster",
    "border-b",
    "border-gray-200"
  );
  const postPreviewTopBarClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "w-full",
    "h-[7.2rem]",
    "mo:h-[13.6rem]",
    "gap-[0.8rem]"
  );
  const postPreviewNameClass = classNames(
    "font-semibold",
    "text-[2rem]",
    "leading-[1.6rem]",
    "text-gray-800"
  );
  const imageFrameClass = classNames(
    "w-[7.2rem]",
    "h-[7.2rem]",
    "relative",
    "border-gray-200",
    "rounded-[0.8rem]"
  );
  const postPreviewBottomBarClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "w-full",
    "h-[2.6rem]",
    "mo:h-[2.4rem]",
    "mt-[1.6rem]",
    "mb-[2.4rem]"
  );
  const postPreviewBottomBarNicknameDateClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "gap-[0.8rem]"
  );
  const profileFrameeClass = classNames(
    "w-[2.4rem]",
    "h-[2.4rem]",
    "relative",
    "rounded-full"
  );
  const postPreviewBottomNicknameClass = classNames(
    "font-normal",
    "text-[1.4rem]",
    "leading-[2.4rem]"
  );

  return (
    <Link href={link}>
      <div className={postPreviewClass}>
        <div className={postPreviewTopBarClass}>
          <div className={postPreviewNameClass}>{name}</div>
          <div className={imageFrameClass}>
            <PostPreviewImage imgUrl={img} />
          </div>
        </div>
        <div className={postPreviewBottomBarClass}>
          <div className={postPreviewBottomBarNicknameDateClass}>
            <div className={profileFrameeClass}>
              <PostUserProfile imgUrl={ownerImg} />
            </div>
            <div className={postPreviewBottomNicknameClass}>
              {ownerNickname}
            </div>
            <Date dbDate={createdDate} />
          </div>
          <PostPreviewFavorite
            isFavorite={isFavorite}
            favriteCount={favoriteCount}
          />
        </div>
      </div>
    </Link>
  );
}

export default PostPreview;
