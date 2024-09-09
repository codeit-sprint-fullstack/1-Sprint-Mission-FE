"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";

import { DeviceContext } from "../components/DeviceProvider";
import { instance } from "@/lib/axios";
import PostPreview from "./PostPrevies";
import Search from "../components/Search";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "../components/DropDown";

import {
  ORDER_BY_RECENT,
  ORDER_BY_FAVORITE,
  ORDER_BY,
  ORDER_TEXT,
} from "../constants/sort";

import style from "./board.module.css";

const BOARD_INFINITY_SCROLL_Y = [313, 29, 101];
const PAGE_SIZE_BY_DEVICE = [4, 6, 3];

export function Board() {
  const [list, setList] = useState([]);
  const [recentOrder, setRecentOrder] = useState(ORDER_TEXT[ORDER_BY_RECENT]);
  const [page, setPage] = useState(1);
  const [addingList, setAddingList] = useState(false);

  const { device } = useContext(DeviceContext);

  let tempList = [0, 1, 2, 3];

  const boardClass = `${style.board}`;
  const boardTopBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const boardTopBarLabelClass = `font-bold ${style["top-bar-name"]}`;
  const boardTopBarBtnWritePostClass = `${style["top-bar-btn-write-post"]}`;

  const boardMiddleBarClass = `flex flex-row justify-between ${style["middle-bar"]}`;
  const boardListClass = `flex flex-col ${style.list}`;

  const handleSortByRecent = () => {
    setRecentOrder(ORDER_TEXT[ORDER_BY_RECENT]);
    setPage(1);
    const path = "article";
    const config = {
      params: {
        page: 1,
        pageSize: PAGE_SIZE_BY_DEVICE[device],
        orderBy: ORDER_BY[ORDER_BY_RECENT],
      },
    };
    instance.get(path, config).then((res) => {
      const newList = res.data.articles.map((post, index) => {
        return (
          <PostPreview
            key={index}
            title={post.title}
            owner={post.user.name}
            myFavorite={false}
            favoriteCount={post.favorite}
            createdDate={post.createdDate}
          />
        );
      });
      setList(newList);
    });
  };

  const handleSortByFavorite = () => {
    setRecentOrder(ORDER_TEXT[ORDER_BY_FAVORITE]);
    setPage(1);
    const path = "article";
    const config = {
      params: {
        page: 1,
        pageSize: PAGE_SIZE_BY_DEVICE[device],
        orderBy: ORDER_BY[ORDER_BY_FAVORITE],
      },
    };
    instance.get(path, config).then((res) => {
      const newList = res.data.articles.map((post, index) => {
        return (
          <PostPreview
            key={index}
            title={post.title}
            owner={post.user.name}
            myFavorite={false}
            favoriteCount={post.favorite}
            createdDate={post.createdDate}
          />
        );
      });
      setList(newList);
    });
  };

  const postList = tempList.map((post, index) => {
    return <PostPreview key={index} />;
  });

  useEffect(() => {
    const path = "article";
    const config = {
      params: {
        page: 1,
        pageSize: PAGE_SIZE_BY_DEVICE[device],
        orderBy: recentOrder,
      },
    };

    instance.get(path, config).then((res) => {
      const newList = res.data.articles.map((post, index) => {
        return (
          <PostPreview
            key={index}
            title={post.title}
            owner={post.user.name}
            myFavorite={false}
            favoriteCount={post.favorite}
            createdDate={post.createdDate}
          />
        );
      });

      setList(newList);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - BOARD_INFINITY_SCROLL_Y[device] &&
        !addingList
      ) {
        setAddingList(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [device]);

  useEffect(() => {
    if (!addingList) {
      return;
    }

    setList([...list, additionalList]);
    setPage(page + 1);
    setAddingList(false);
  }, [addingList]);

  return (
    <div className={boardClass}>
      <div className={boardTopBarClass}>
        <div className={boardTopBarLabelClass}>게시글</div>
        <Link href="/write-post" target="_self">
          <button className={boardTopBarBtnWritePostClass} />
        </Link>
      </div>
      <div className={boardMiddleBarClass}>
        <Search />
        <Dropdown>
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
      <div className={boardListClass}>{list}</div>
    </div>
  );
}

export default Board;
