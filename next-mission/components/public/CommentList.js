import { useCallback, useEffect, useRef, useState } from "react";
import style from "./CommentList.module.css";
import Image from "next/image";
import Link from "next/link";
import CommentListBody from "./CommentListBody";

export default function CommentList({
  mode,
  comment,
  hasMore,
  loadMore,
  deleteCommentHandler,
  patchComment,
  setPatchComment,
  patchCommentHandler,
}) {
  const [buttonMargin, setButtonMargin] = useState(style.yesListButton); //(style.noListButton);
  const [noListImage, setNoListImage] = useState("");
  const [noListText, setNoListText] = useState("");
  const [alt, setAlt] = useState("");
  const [goBackLink, setGoBackLink] = useState("");
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

  useEffect(() => {
    // 사용처에 따른 이미지 및 텍스트 변경
    if (mode === "자유게시판") {
      setNoListImage("/images/Img_speech_bubble.svg");
      setNoListText(["아직 댓글이 없어요,", <br />, "지금 댓글을 달아보세요!"]);
      setAlt("말풍선");
      setGoBackLink('/freeNoticeBoard')
    } else if (mode === "중고마켓") {
      setNoListImage("/images/Img_inquiry.svg");
      setNoListText("아직 문의가 없어요");
      setAlt("문의하는 판다");
      setGoBackLink('/items')
    }

    // 댓글이 없을 시 이미지 보여주는 로직
    if (comment.length === 0) {
      setButtonMargin(style.noListButton);
    } else {
      setButtonMargin(style.yesListButton);
    }
  }, [comment]);

  return (
    <>
      {comment.length > 0 || (
        <div className={`${style.noComment} ${style.flexColumn}`}>
          <Image src={noListImage} width={140} height={140} alt={alt} />
          <div className={style.noCommentText}>{noListText}</div>
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
                    patchComment={patchComment}
                    setPatchComment={setPatchComment}
                    patchCommentHandler={patchCommentHandler}
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
                    patchComment={patchComment}
                    setPatchComment={setPatchComment}
                    patchCommentHandler={patchCommentHandler}
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
      <Link href={goBackLink}>
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
