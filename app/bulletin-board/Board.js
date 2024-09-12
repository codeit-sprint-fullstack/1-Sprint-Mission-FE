import Link from "next/link";
import { useState, useEffect, useContext } from "react";

import { DeviceContext } from "../components/DeviceProvider";
import { getArticles } from "@/lib/axios";
import ArticlePreview from "./ArticlePreview";
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

// 임시로 기존 figma 요구사항에 맞춘 값 > page_size 동일하게 변경 예정
const BOARD_INFINITY_SCROLL_Y = [313, 29, 101];
const PAGE_SIZE_BY_DEVICE = [4, 6, 3];

export function Board() {
  const [list, setList] = useState([]);
  const [recentOrder, setRecentOrder] = useState(ORDER_TEXT[ORDER_BY_RECENT]);
  const [page, setPage] = useState(1);
  const [addingList, setAddingList] = useState(false);

  const { device } = useContext(DeviceContext);

  const boardClass = `${style.board}`;
  const boardTopBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const boardTopBarLabelClass = `font-bold ${style["top-bar-name"]}`;
  const boardTopBarBtnWriteArticleClass = `${style["top-bar-btn-write-article"]}`;

  const boardMiddleBarClass = `flex flex-row justify-between ${style["middle-bar"]}`;
  const boardListClass = `flex flex-col ${style.list}`;

  const handleSortByRecent = () => {
    setRecentOrder(ORDER_TEXT[ORDER_BY_RECENT]);
    setPage(1);
    getArticles(1, PAGE_SIZE_BY_DEVICE[device], ORDER_BY[ORDER_BY_RECENT]).then(
      (data) => {
        const newList = data.articles.map((article, index) => {
          return (
            <ArticlePreview
              key={index}
              title={article.title}
              profileImgUrl={article.user.image}
              nickname={article.user.nickname}
              myFavorite={article.myFavorite}
              favoriteCount={article.favorite}
              createdDate={article.createdAt}
            />
          );
        });
        setList(newList);
      }
    );
  };

  const handleSortByFavorite = () => {
    setRecentOrder(ORDER_TEXT[ORDER_BY_FAVORITE]);
    setPage(1);
    getArticles(
      1,
      PAGE_SIZE_BY_DEVICE[device],
      ORDER_BY[ORDER_BY_FAVORITE]
    ).then((data) => {
      const newList = data.articles.map((article, index) => {
        return (
          <ArticlePreview
            key={index}
            title={article.title}
            profileImgUrl={article.user.image}
            nickname={article.user.nickname}
            myFavorite={article.myFavorite}
            favoriteCount={article.favorite}
            createdDate={article.createdAt}
          />
        );
      });
      setList(newList);
    });
  };

  useEffect(() => {
    getArticles(1, PAGE_SIZE_BY_DEVICE[device], recentOrder).then((data) => {
      const newList = data.articles.map((article, index) => {
        return (
          <ArticlePreview
            key={index}
            title={article.title}
            profileImgUrl={article.user.image}
            nickname={article.user.nickname}
            myFavorite={article.myFavorite}
            favoriteCount={article.favorite}
            createdDate={article.createdAt}
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

    setList([...list, addingList]);
    setPage(page + 1);
    setAddingList(false);
  }, [addingList]);

  return (
    <div className={boardClass}>
      <div className={boardTopBarClass}>
        <div className={boardTopBarLabelClass}>게시글</div>
        <Link href="/article-registration" target="_self">
          <button className={boardTopBarBtnWriteArticleClass} />
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
