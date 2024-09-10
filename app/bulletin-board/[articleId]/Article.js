import Image from "next/image";

import Profile from "@/app/components/Profile";
import Date from "@/app/components/Date";
import Favorite from "@/app/components/Favorite";
import { POST_DETAIL } from "@/app/constants/Favorite";

import style from "./article.module.css";

export function Article({
  title,
  profileImgUrl,
  ownerName,
  createdDate,
  favoriteCount,
}) {
  const topBarClass = `flex flex-row justify-between ${style["top-bar"]}`;
  const topBarTextClass = `font-bold ${style["top-bar-text"]}`;
  const topBarBtnEllipsis = `${style["top-bar-ellipsis"]}`;
  const middleBarClass = `flex flex-row item-center ${style["middle-bar"]}`;
  const middleBarOwnerDateSetClass = `flex flex-row ${style["top-bar-btn-ellipsis"]}`;
  const middleBarOwnerClass = `font-medium ${style["middle-bar-owner"]}`;
  const dividerClass = `flex flex-row ${style.divider}`;
  const contentClass = `font-normal ${style.content}`;

  const Owner = () => {
    return <p className={middleBarOwnerClass}>{ownerName}</p>;
  };

  const Divider = () => {
    return (
      <div className={dividerClass}>
        <Image src="images/divider.svg" />
      </div>
    );
  };

  // 임시로 <button className={topBarBtnEllipsis} /> 사용. dropdown으로 기획 후 변경 예정
  return (
    <div className={style.article}>
      <div className={topBarClass}>
        <div className={topBarTextClass}>{title}</div>
        <button className={topBarBtnEllipsis} />
      </div>
      <div className={middleBarClass}>
        <Profile profileImgUrl={profileImgUrl} />
        <div className={middleBarOwnerDateSetClass}>
          <Owner />
          <Date date={createdDate} />
        </div>
        <Divider />
        <Favorite type={POST_DETAIL} favoriteCount={favoriteCount} />
      </div>
      <div className={contentClass}></div>
    </div>
  );
}
