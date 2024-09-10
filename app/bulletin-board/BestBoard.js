"use client";

import { useContext, useState, useEffect } from "react";

import { BestArticle } from "./BestArticle";
import { DeviceContext } from "../components/DeviceProvider";

import { getArticles } from "@/lib/axios";
import { BEST_ARTICLE_PAGE_SIZE } from "../constants/Favorite";

import style from "./bestboard.module.css";

export function BestBoard() {
  const { device } = useContext(DeviceContext);
  const [list, setList] = useState([]);

  const boardClass = `${style.bestboard}`;
  const boardLabelClass = `font-bold ${style.label}`;
  const boardListClass = `flex flex-row ${style.list}`;

  useEffect(() => {
    getArticles(1, BEST_ARTICLE_PAGE_SIZE[device], "favorite").then((data) => {
      const newList = data.articles.map((article, index) => {
        return (
          <BestArticle
            key={index}
            title={article.title}
            imgUrl={"../../public/images/no_image.svg"}
            owner={article.user.name}
            myFavorite={false}
            favoriteCount={article.favorite}
            createdDate={article.createdDate}
          />
        );
      });
      setList(newList);
    });
  }, [device]);

  return (
    <div className={boardClass}>
      <div className={boardLabelClass}>베스트 게시글</div>
      <div className={boardListClass}>{list}</div>
    </div>
  );
}

export default BestBoard;
