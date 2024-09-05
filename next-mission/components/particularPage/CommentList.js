import { useState } from "react";
import CommentListBody from "./CommentListBody";

export default function CommentList() {
  const [list, setList] = useState([]); // 예정
  const [noList, setNoList] = useState(false);

  return (
    <>
      {noList && (
        <div>
          <img />
          <div>아직 댓글이 없어요, 지금 댓글을 달아보세요!</div>
        </div>
      )}
      <ul>
        {list.map((comment) => {
          return (
            <li>
              <CommentListBody comment={comment} />
            </li>
          );
        })}
      </ul>
      <div>
        <div>목록으로 돌아가기</div>
        <img />
      </div>
    </>
  );
}
