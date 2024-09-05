import { useState } from "react";
import ArticleBody from "./ArticleBody";

export default function Article() {
  const [list, setList] = useState([]); // 예정
  return (
    <div>
      <div>
        <div>게시글</div>
        <div>글쓰기</div>
      </div>
      <div>
        <input />
        <img />
        <div>드롭 다운</div>
      </div>
      <ul>
        {list.map((data) => {
          return (
            <li>
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
