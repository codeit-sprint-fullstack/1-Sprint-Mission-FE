import { useCallback, useEffect, useState } from "react";
import useResize from "../hook/useResize";
import BestArticleBody from "./BestArticleBody";
import style from "./BestArticle.module.css";
import instance from "@/lib/axios";

export default function BestArticle({ list }) {
  const [idx, setIdx] = useState([0, 1, 2]);

  if (list[0]) {
    // 스크린 크기에 따른 베스트 게시물 갯수 변경
    const handleResize = useCallback(() => {
      const length = window.innerWidth;

      if (length >= 1200) {
        setIdx([0, 1, 2]);
      } else if (length >= 768 && length < 1200) {
        setIdx([0, 1]);
      } else if (length >= 375 && length < 768) {
        setIdx([0]);
      }
    }, []);

    useResize(handleResize);
  }

  return (
    <div className={style.contaner}>
      <div className={style.title}>베스트 게시글</div>
      <ul className={style.BestArticleUl}>
        {idx.map((idx) => {
          return (
            <li className={style.BestArticleLi} key={idx}>
              <BestArticleBody list={list[idx]} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
