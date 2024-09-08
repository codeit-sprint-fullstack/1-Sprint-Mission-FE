"use client";

import { useContext, useState, useEffect } from "react";

import { BestPost } from "./BestPost";
import { DeviceContext } from "../components/DeviceProvider";

import style from "./bestboard.module.css";

export function BestBoard() {
  const { device } = useContext(DeviceContext);
  const [list, setList] = useState([]);

  const boardClass = `${style.bestboard}`;
  const boardLabelClass = `font-bold ${style.label}`;
  const boardListClass = `flex flex-row ${style.list}`;

  useEffect(() => {
    let newList = [0, 1, 2]; // 임시. API로 처리하도록 수정해야함

    if (device === 2) {
      newList = [0, 1];
    }

    setList(newList);
  }, [device]);

  const bestList = list.map((best, index) => {
    return (
      <BestPost
        key={index}
        title={"임시 제목"}
        imgUrl={"../../public/images/no_image.svg"}
        owner={"임시 작성자"}
        myFavorite={false}
        favoriteCount={9999}
        createdDate={"2023.04.16"}
      />
    );
  });

  return (
    <div className={boardClass}>
      <div className={boardLabelClass}>베스트 게시글</div>
      <div className={boardListClass}>{bestList}</div>
    </div>
  );
}

export default BestBoard;
