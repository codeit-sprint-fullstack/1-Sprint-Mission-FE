import classNames from "classnames";

import { getPostList } from "src/lib/api-post";
import { BestPost } from "./BestPost";

import { BEST_POST_PAGE_SIZE } from "../constants/post";
import { PostData } from "src/types/post";

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

  let list = await getPostList({
    page: 1,
    pageSize: BEST_POST_PAGE_SIZE,
    orderBy: "favorite",
  }).then((data) => {
    const newList = data.posts.map((post: PostData, index: number) => {
      return (
        <BestPost
          key={index}
          postId={post.id}
          name={post.name}
          imgUrl={"../../../public/images/no_image.svg"}
          nickname={post.ownerNickname}
          myFavorite={post.isFavorite}
          favoriteCount={post.favoriteCount}
          createdDate={post.createdAt}
        />
      );
    });

    return newList;
  });

  return (
    <div className={boardClass}>
      <div className={boardLabelClass}>베스트 게시글</div>
      <div className={boardListClass}>{list}</div>
    </div>
  );
}

export default BestBoard;
