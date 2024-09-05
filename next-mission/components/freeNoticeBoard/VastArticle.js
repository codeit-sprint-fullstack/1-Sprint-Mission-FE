import { useCallback, useState } from "react";
import useResize from "../hook/useResize";
import VastArticleBody from "./VastArticleBody";

export default function VastArticle() {
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
    <div>
      <div>베스트 게시글</div>
      <ul>
        {idx.map((idx) => {
          return (
            <li>
              <VastArticleBody list={list[idx]} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
