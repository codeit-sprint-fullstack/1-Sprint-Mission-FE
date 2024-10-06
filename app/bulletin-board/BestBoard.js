import classNames from "classnames";

import { getPosts } from "@/lib/api-post";
import { BestArticle } from "./BestArticle";

import { BEST_ARTICLE_PAGE_SIZE } from "../constants/article";

export async function BestBoard() {
  const boardClass = classNames(
    "w-pc-content",
    "h-pc-best-board",
    "tablet:w-tablet-content",
    "tablet:h-tablet-best-board",
    "mobile:w-mobile-content",
    "mobile:h-mobile-best-board"
  );
  const boardLabelClass = classNames(
    "h-2.4rem",
    "text-xl",
    "leading-32",
    "font-bold",
    "mobile:h-2.6rem",
    "mobile:text-2lg",
    "mobile:leading-26"
  );
  const boardListClass = classNames(
    "flex",
    "flex-row",
    "mt-2.4rem",
    "w-pc-content",
    "h-pc-best-board-list",
    "gap-2.4rem",
    "overflow-hidden",
    "tablet:w-tablet-content",
    "tablet:h-tablet-best-board-list",
    "gap-1.6rem",
    "mobile:w-mobile-content",
    "mobile:h-mobile-best-board-list",
    "mobile:mt-1.6rem"
  );

  let list = await getPosts(1, BEST_ARTICLE_PAGE_SIZE, "favorite").then(
    (data) => {
      const newList = data.articles.map((article, index) => {
        return (
          <BestArticle
            key={index}
            postId={article.id}
            title={article.title}
            imgUrl={"../../public/images/no_image.svg"}
            nickname={article.user.nickname}
            myFavorite={article.myFavorite}
            favoriteCount={article.favorite}
            createdDate={article.createdAt}
          />
        );
      });

      return newList;
    }
  );

  return (
    <div className={boardClass}>
      <div className={boardLabelClass}>베스트 게시글</div>
      <div className={boardListClass}>{list}</div>
    </div>
  );
}

export default BestBoard;
