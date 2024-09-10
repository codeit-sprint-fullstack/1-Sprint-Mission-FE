import { useCallback, useRef, useState } from "react";
import ArticleBody from "./ArticleBody";
import Link from "next/link";
import style from "./Article.module.css";
import Image from "next/image";

export default function Article({ list, hasMore, loadMore, searchValue }) {
  const [value, setValue] = useState("");
  const observerRef = useRef();

  // Intersection Observer 콜백
  const lastItemRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore(); // 상위 컴포넌트에서 전달된 함수 호출
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasMore, loadMore]
  );

  // 검색에 따른 게시물 변경 함수
  function onKeyUpHandler() {
    searchValue(value);
  }

  // value 값 일치 함수
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={style.Article_contaner}>
      <div className={`${style.Article_subject_button} ${style.flex_row}`}>
        <div className={style.Article_subject}>게시글</div>
        <Link href={"/freeNoticeBoard/postArticle"}>
          <div className={style.Article_button}>글쓰기</div>
        </Link>
      </div>
      <div className={`${style.Article_search_form} ${style.flex_row}`}>
        <Image
          className={style.Article_search_img}
          src={"/images/ic_search.svg"}
          width={24}
          height={24}
          alt="돋보기"
        />
        <input
          className={`${style.Article_search_input} ${style.search_form_font}`}
          placeholder="검색할 상품을 입력해주세요"
          value={value}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
        />
        <div className={`${style.Article_drop_down} ${style.search_form_font}`}>
          <div>최신순</div>
          <Image
            className={style.Article_drop_down_arrow}
            src={"/images/ic_drop_down_arrow.svg"}
            width={24}
            height={24}
            alt="아래 화살표"
          />
        </div>
      </div>
      <ul className={style.Article_ul}>
        {list.map((data, idx) => {
          if (idx === list.length - 1) {
            return (
              <li className={style.Article_li} ref={lastItemRef} key={data.id}>
                <ArticleBody data={data} />
              </li>
            );
          } else {
            return (
              <li className={style.Article_li} key={data.id}>
                <ArticleBody data={data} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
