import { useCallback, useState } from "react";
import useResize from "../hook/useResize";
import BestArticleBody from "./BestArticleBody";
import style from './BestArticle.module.css'

export default function BestArticle() {
  const [list, setList] = useState([]); //예정
  const [idx, setIdx] = useState([0, 1, 2]);

  // 스크린 크기에 따른 로고 변경
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

  return (
    <div className={style.vastArticle_contaner}>
      <div className={style.vastArticle_title}>베스트 게시글</div>
      <ul className={style.vastArticle_ul}>
        {idx.map((idx) => {
          return (
            <li className={style.vastArticle_li}>
              <BestArticleBody list={list[idx]} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
