import Image from "next/image";

import Favorite from "../components/Favorite";
import Date from "../components/Date";
import { BEST_ARTICLE } from "../constants/Favorite";
import { ProductImg } from "../components/ProductImg";

import style from "./best-article.module.css";

export function BestArticle({
  title = "게시글 제목",
  imgUrl,
  owner = "작성자",
  myFavorite = false,
  favoriteCount = 0,
  createdDate,
}) {
  const bestArticleClass = `${style["best-article"]}`;
  const bestArticleContentClass = `${style.content}`;
  const badgeFrameClass = `${style["badge-frame"]}`;
  const badgeImgClass = `${style["badge-img"]}`;
  const articleMainClass = `flex flex-row justify-between ${style["article-main"]}`;
  const articleTitleClass = `font-semibold ${style["article-title"]}`;
  const articleBottomBarClass = `flex flex-row justify-between items-center ${style["article-bottom-bar"]}`;
  const articleBottomOwnerClass = `flex items-center font-normal text-gray-600 align-middle ${style["article-bottom-name"]}`;

  const createdDateText = createdDate;

  return (
    <div className={bestArticleClass}>
      <div className={bestArticleContentClass}>
        <div className={badgeFrameClass}>
          <img className={badgeImgClass} alt="베스트 게시글 마크" />
        </div>
        <div className={articleMainClass}>
          <div className={articleTitleClass}>{title}</div>
          <ProductImg />
        </div>
        <div className={articleBottomBarClass}>
          <div className="flex flex-row">
            <div className={articleBottomOwnerClass}>{owner}</div>
            <Favorite
              type={BEST_ARTICLE}
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

export default BestArticle;
