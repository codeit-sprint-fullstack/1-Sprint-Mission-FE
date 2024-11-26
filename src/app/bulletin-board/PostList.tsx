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

  const boardClass = classNames(
    "w-full",
    "mt-[4rem]",
    "mb-[29.3rem]",
    "ta:mt-[2.4rem]",
    "ta:mb-[1.9rem]",
    "mo:mt-[2.4rem]",
    "mo:mb-[9.1rem]"
  );
  const boardTopBarClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "justify-between",
    "w-full",
    "h-[4.2rem]"
  );
  const boardTopBarLabelClass = classNames(
    "font-bold",
    "text-[2rem]",
    "leading-[3.2rem]",
    "text-gray-800"
  );
  const boardTopBarBtnWritePostClass = classNames(
    "w-[8.8rem]",
    "h-[4.2rem]",
    "bg-btn-post-list__to-create-page"
  );
  const boardMiddleBarClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "w-full",
    "h-[4.2rem]",
    "mt-[2.4rem]",
    "ta:mt-[4.8rem]",
    "mo:mt-[1.6rem]"
  );
  const searchFrameClass = classNames(
    "w-[105.4rem]",
    "ta:w-[56rem]",
    "mo:w-[28.2rem]"
  );
  const boardListClass = classNames(
    "flex",
    "flex-col",
    "gap-[2.4rem]",
    "w-full",
    "mt-[2.4rem]",
    "ta:mt-[4rem]",
    "mo:mt-[1.6rem]"
  );

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
