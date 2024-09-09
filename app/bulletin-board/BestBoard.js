"use client";

import { useContext, useState, useEffect } from "react";

import { BestPost } from "./BestPost";
import { DeviceContext } from "../components/DeviceProvider";

import { getArticles } from "@/lib/axios";
import { BEST_POST_PAGE_SIZE } from "../constants/Favorite";

import style from "./bestboard.module.css";

export function BestBoard() {
  const { device } = useContext(DeviceContext);
  const [list, setList] = useState([]);

  const boardClass = `${style.bestboard}`;
  const boardLabelClass = `font-bold ${style.label}`;
  const boardListClass = `flex flex-row ${style.list}`;

  useEffect(() => {
    getArticles(1, BEST_POST_PAGE_SIZE[device], "favorite").then((data) => {
      const newList = data.articles.map((post, index) => {
        return (
          <BestPost
            key={index}
            title={post.title}
            imgUrl={"../../public/images/no_image.svg"}
            owner={post.user.name}
            myFavorite={false}
            favoriteCount={post.favorite}
            createdDate={post.createdDate}
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
