import { useState } from "react";
import ArticleBody from "./ArticleBody";
import Link from "next/link";
import style from "./Article.module.css";
import Image from "next/image";

export default function Article() {
  const [list, setList] = useState([1, 2, 3, 4]); // 예정

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
        {list.map((data) => {
          return (
            <li className={style.Article_li}>
              <ArticleBody />
            </li>
          );
        })}
      </ul>
      {/* <Pagination
        activePage={1} // 현재 페이지
        itemsCountPerPage={3} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={3} // 총 아이템 갯수
        pageRangeDisplayed={3} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={1} // 페이지 변경을 핸들링하는 함수
      /> */}
    </div>
  );
}
