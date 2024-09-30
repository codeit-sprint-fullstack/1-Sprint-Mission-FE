"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { FAVORITE_CLASSES } from "../constants/Favorite";

import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "@/lib/api-codeit-product";

const SRCS = ["/icons/ic_heart_empty_small.svg", "/icons/ic_heart_full.svg"];

export default function Favorite({
  type,
  myFavorite = false,
  favoriteCount,
  objectId,
}) {
  const [isFavorite, setIsFavorite] = useState(myFavorite);
  const [favoriteCountText, setFavoriteCountText] = useState(
    favoriteCount < 9999 ? favoriteCount : "9999+"
  );
  const favoriteClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "border-box",
    FAVORITE_CLASSES[type].favorite
  );
  const favoriteCountClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "font-normal",
    "text-gray-500",
    FAVORITE_CLASSES[type].count
  );
  const heartImgFrameClass = classNames(
    "relative",
    FAVORITE_CLASSES[type].heart
  );

  // 임시로 함수 배열 형식으로 favorite 처리. 컴포넌트를 나누거나, 다른 방식으로 고려 중
  const TOOGLE_FAVORITE = [[], [addFavoriteProduct, removeFavoriteProduct]];

  const handleClickHeart = () => {
    TOOGLE_FAVORITE[Math.floor(Number(type) / 3)]
      [Number(isFavorite)](objectId)
      .then((data) => {
        setIsFavorite(data.isFavorite);
        setFavoriteCountText(data.favoriteCount);
      });
  };

  console.log("Number(myFavorite) : ", Number(isFavorite));

  return (
    <div className={favoriteClass}>
      <button onClick={handleClickHeart}>
        <div className={heartImgFrameClass}>
          <Image src={SRCS[Number(isFavorite)]} fill alt="좋아요 마크" />
        </div>
      </button>
      <div className={favoriteCountClass}>{favoriteCountText}</div>
    </div>
  );
}
