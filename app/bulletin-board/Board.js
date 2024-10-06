"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import throttle from "lodash/throttle";
import classNames from "classnames";

import { getPosts } from "@/lib/api-post";
import ArticlePreview from "./ArticlePreview";
import Search from "../components/Search";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "../components/DropDown";
import Loading from "../components/Loading";

import {
  ORDER_BY_RECENT,
  ORDER_BY_FAVORITE,
  ORDER_BY,
  ORDER_TEXT,
} from "../constants/sort";
import { PAGE_SIZE } from "../constants/article";

import style from "./board.module.css";

const BOARD_INFINITY_SCROLL_Y = 100;

export function Board() {
  const [recentOrder, setRecentOrder] = useState(ORDER_TEXT[ORDER_BY_RECENT]);

  const boardClass = `${style.board}`;
  const boardTopBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const boardTopBarLabelClass = `font-bold ${style["top-bar-name"]}`;
  const boardTopBarBtnWriteArticleClass = `${style["top-bar-btn-write-article"]}`;

  const boardMiddleBarClass = `flex flex-row justify-between ${style["middle-bar"]}`;
  const searchFrameClass = classNames(
    "w-board-search",
    "tablet:w-tablet-board-search",
    "mobile:w-mobile-board-search"
  );
  const boardListClass = `flex flex-col ${style.list}`;

  const handleSortByRecent = () => {
    setRecentOrder(ORDER_BY[ORDER_BY_RECENT]);
  };

  const handleSortByFavorite = () => {
    setRecentOrder(ORDER_BY[ORDER_BY_FAVORITE]);
  };

  let page = 1;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["free-post", { PAGE_SIZE, recentOrder }],
      queryFn: ({ pageParam = page }) =>
        getPosts(pageParam, PAGE_SIZE, recentOrder),
      getNextPageParam: (lastPage, allPages) => {
        const totalFetchedPosts = allPages.flatMap(
          (page) => page.articles
        ).length;
        const totalCount = lastPage.totalCount;

        if (totalFetchedPosts < totalCount) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  const tempList = (
    <div className={boardListClass}>
      {data?.pages.map((page, pageIndex) =>
        page.articles.map((post, index) => (
          <ArticlePreview
            key={`${pageIndex}-${index}`}
            articleId={post.id}
            title={post.title}
            profileImgUrl={post.user.image}
            nickname={post.user.nickname}
            myFavorite={post.myFavorite}
            favoriteCount={post.favorite}
            createdDate={post.createdAt}
          />
        ))
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = Math.ceil(
        window.innerHeight + document.documentElement.scrollTop
      );
      const documentHeight = document.documentElement.offsetHeight;
      const threshold = BOARD_INFINITY_SCROLL_Y;

      const isBottom = scrollPosition >= documentHeight - threshold;

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={boardClass}>
      <div className={boardTopBarClass}>
        <div className={boardTopBarLabelClass}>게시글</div>
        <Link href="/article-registration" target="_self">
          <button className={boardTopBarBtnWriteArticleClass} />
        </Link>
      </div>
      <div className={boardMiddleBarClass}>
        <div className={searchFrameClass}>
          <Search />
        </div>
        <Dropdown minimise={true}>
          <DropdownToggle>{recentOrder}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleSortByRecent}>
              {ORDER_TEXT[ORDER_BY_RECENT]}
            </DropdownItem>
            <DropdownItem onClick={handleSortByFavorite}>
              {ORDER_TEXT[ORDER_BY_FAVORITE]}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {tempList}
    </div>
  );
}

export default Board;
