import { useCallback, useEffect, useRef, useState } from "react";
import CommentListBody from "./CommentListBody";
import style from "./CommentList.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CommentList({ comment, hasMore, loadMore, deleteCommentHandler }) {
  const [noList, setNoList] = useState(false);
  const [buttonMargin, setButtonMargin] = useState(style.yes_list_button); //(style.no_list_button);
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
      setNoList(true);
      setButtonMargin(style.no_list_button);
    } else {
      setNoList(false);
      setButtonMargin(style.yes_list_button);
    }
  }, [comment]);

  return (
    <>
      {noList && (
        <div className={`${style.CommentList_no_comment} ${style.flex_column}`}>
          <Image
            src={"/images/Img_speech_bubble.svg"}
            width={140}
            height={140}
            alt="말풍선"
          />
          <div className={style.CommentList_no_comment_text}>
            아직 댓글이 없어요, <br />
            지금 댓글을 달아보세요!
          </div>
        </div>
      )}
      {noList || (
        <ul className={`${style.CommentList_ul} ${style.flex_column}`}>
          {comment.map((data, idx) => {
            if (idx === comment.length - 1) {
              return (
                <li
                  className={style.CommentList_li}
                  ref={lastItemRef}
                  key={data.id}
                >
                  <CommentListBody
                    comment={data}
                    deleteCommentHandler={deleteCommentHandler}
                    idx={idx}
                  />
                </li>
              );
            } else {
              return (
                <li className={style.CommentList_li} key={data.id}>
                  <CommentListBody
                    comment={data}
                    deleteCommentHandler={deleteCommentHandler}
                    idx={idx}
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
      <Link href="/freeNoticeBoard">
        <div className={`${style.CommentList_button} ${buttonMargin}`}>
          <div>목록으로 돌아가기</div>
          <Image
            className={style.CommentList_arrow_img}
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
