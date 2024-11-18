"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import throttle from "lodash/throttle";
import classNames from "classnames";

import { getPostList } from "src/lib/api-post";
import PostPreview from "./PostPreview";
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
import { PAGE_SIZE } from "../constants/post";
import { SearchParamState } from "src/types/param";
import { PostListData } from "src/types/post";

import style from "./board.module.css";

const BOARD_INFINITY_SCROLL_Y = 100;

interface GetPostListParams {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

export default function PostList() {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [recentOrder, setRecentOrder] = useState<string>(
    ORDER_TEXT[ORDER_BY_RECENT]
  );

  const boardClass = `${style.board}`;
  const boardTopBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const boardTopBarLabelClass = `font-bold ${style["top-bar-name"]}`;
  const boardTopBarBtnWritePostClass = `${style["top-bar-btn-write-post"]}`;

  const boardMiddleBarClass = `flex flex-row justify-between ${style["middle-bar"]}`;
  const searchFrameClass = classNames(
    "w-board-search",
    "ta:w-ta-board-search",
    "mo:w-mo-board-search"
  );
  const boardListClass = `flex flex-col ${style.list}`;

  const handleSortByRecent = () => {
    setRecentOrder(ORDER_BY[ORDER_BY_RECENT]);
  };

  const handleSortByFavorite = () => {
    setRecentOrder(ORDER_BY[ORDER_BY_FAVORITE]);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["free-post", { PAGE_SIZE, order: recentOrder, keyword }],
      queryFn: ({ pageParam = 1 }) =>
        getPostList({
          page: pageParam,
          pageSize: PAGE_SIZE,
          orderBy: ORDER_BY[ORDER_BY_RECENT],
          keyword,
        }),
      getNextPageParam: (lastPage: PostListData, allPages: PostListData[]) => {
        const totalFetchedPosts = allPages.flatMap((page) => page.posts).length;
        const totalCount = lastPage.totalCount;

        return totalFetchedPosts < totalCount ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  console.log("data : ", data);

  const tempList = (
    <div className={boardListClass}>
      {data?.pages.map((page, pageIndex) =>
        page.posts.map((post, index) => (
          <PostPreview
            key={`${post.id}`}
            postId={post.id}
            name={post.name}
            img={post.images[0]}
            ownerImg={post.ownerImage}
            ownerNickname={post.ownerNickname}
            isFavorite={post.isFavorite}
            favoriteCount={post.favoriteCount}
            createdDate={post.createdAt}
          />
        ))
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );

  useEffect(() => {
    const throttledHandleScroll = throttle(() => {
      const scrollPosition = Math.ceil(
        window.innerHeight + document.documentElement.scrollTop
      );
      const documentHeight = document.documentElement.offsetHeight;
      const threshold = BOARD_INFINITY_SCROLL_Y;

      if (
        scrollPosition >= documentHeight - threshold &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={boardClass}>
      <div className={boardTopBarClass}>
        <div className={boardTopBarLabelClass}>게시글</div>
        <Link href="/post-registration" target="_self">
          <button className={boardTopBarBtnWritePostClass} />
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
