import { useCallback, useRef, useState } from "react";
import ArticleBody from "./ArticleBody";
import Link from "next/link";
import style from "./Article.module.css";
import Image from "next/image";
import useResize from "../hook/useResize";

export default function Article({ list, hasMore, loadMore, searchValue }) {
  const [value, setValue] = useState("");
  const [dropDown, setDropDown] = useState("/images/ic_drop_down_arrow.svg");
  const [hideText, setHideText] = useState(false);
  const observerRef = useRef();

  // 스크린 크기에 따른 베스트 게시물 갯수 변경
  const handleResize = useCallback(() => {
    const length = window.innerWidth;

    if (length >= 768) {
      setDropDown("/images/ic_drop_down_arrow.svg");
      setHideText(false);
    } else if (length >= 375 && length < 768) {
      setDropDown("/images/ic_mobile_drop_down_arrow.svg");
      setHideText(true);
    }
  }, []);

  useResize(handleResize);

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
    <div className={style.contaner}>
      <div className={`${style.subjectAndButton} ${style.flexRow}`}>
        <div className={style.subject}>게시글</div>
        <Link href={"/freeNoticeBoard/postArticle"}>
          <div className={style.ArticleButton}>글쓰기</div>
        </Link>
      </div>
      <div className={`${style.searchForm} ${style.flexRow}`}>
        <Image
          className={style.searchImg}
          src={"/images/ic_search.svg"}
          width={24}
          height={24}
          alt="돋보기"
        />
        <input
          className={`${style.searchInput} ${style.searchFormFont}`}
          placeholder="검색할 상품을 입력해주세요"
          value={value}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
        />
        <div className={`${style.dropDown} ${style.searchFormFont}`}>
          {hideText || <div>최신순</div>}
          <Image
            className={style.dropDownArrow}
            src={dropDown}
            width={24}
            height={24}
            alt="아래 화살표"
          />
        </div>
      </div>
      <ul className={style.ArticleUl}>
        {list.map((data, idx) => {
          if (idx === list.length - 1) {
            return (
              <li className={style.ArticleLi} ref={lastItemRef} key={data.id}>
                <ArticleBody data={data} />
              </li>
            );
          } else {
            return (
              <li className={style.ArticleLi} key={data.id}>
                <ArticleBody data={data} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
