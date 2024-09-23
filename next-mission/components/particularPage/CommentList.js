import { useCallback, useEffect, useRef, useState } from "react";
import CommentListBody from "./CommentListBody";
import style from "./CommentList.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CommentList({
  comment,
  hasMore,
  loadMore,
  deleteCommentHandler,
  patchCommend,
  setPatchCommend,
}) {
  const [buttonMargin, setButtonMargin] = useState(style.yesListButton); //(style.noListButton);
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

  // 댓글이 없을 시 이미지 보여주는 로직
  useEffect(() => {
    if (!comment[0]) {
      setButtonMargin(style.noListButton);
    } else {
      setButtonMargin(style.yesListButton);
    }
  }, [comment]);

  return (
    <>
      {comment.length > 0 || (
        <div className={`${style.noComment} ${style.flexColumn}`}>
          <Image
            src={"/images/Img_speech_bubble.svg"}
            width={140}
            height={140}
            alt="말풍선"
          />
          <div className={style.noCommentText}>
            아직 댓글이 없어요, <br />
            지금 댓글을 달아보세요!
          </div>
        </div>
      )}
      {comment.length > 0 && (
        <ul className={`${style.CommentListUl} ${style.flexColumn}`}>
          {comment.map((data, idx) => {
            if (idx === comment.length - 1) {
              return (
                <li
                  className={style.CommentListLi}
                  ref={lastItemRef}
                  key={data.id}
                >
                  <CommentListBody
                    comment={data}
                    deleteCommentHandler={deleteCommentHandler}
                    idx={idx}
                    patchCommend={patchCommend}
                    setPatchCommend={setPatchCommend}
                  />
                </li>
              );
            } else {
              return (
                <li className={style.CommentListLi} key={data.id}>
                  <CommentListBody
                    comment={data}
                    deleteCommentHandler={deleteCommentHandler}
                    idx={idx}
                    patchCommend={patchCommend}
                    setPatchCommend={setPatchCommend}
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
      <Link href="/freeNoticeBoard">
        <div className={`${style.CommentListButton} ${buttonMargin}`}>
          <div>목록으로 돌아가기</div>
          <Image
            className={style.arrowImg}
            src={"/images/ic_back_arrow.svg"}
            width={24}
            height={24}
            alt="뒤로가기 화살표"
          />
        </div>
      </Link>
    </>
  );
}
