import { useState } from "react";
import style from "./CommentListBody.module.css";
import Image from "next/image";

export default function CommentListBody({
  comment,
  deleteCommentHandler,
  idx,
  patchCommend,
  setPatchCommend,
}) {
  const [hideDropDown, setHideDropDown] = useState(true);

  // 설정 드롭다운 온/오프 함수
  const dropDownHandler = () => {
    if (!hideDropDown) {
      setHideDropDown(true);
    } else if (hideDropDown) {
      setHideDropDown(false);
    }
  };

  // 댓글 수정 시작 함수
  const patchHandler = () => {
    if (!patchCommend.boolinValue) {
      setPatchCommend({
        boolinValue: true,
        contentValue: comment.content,
        id: comment.id,
        idx,
      });
      setHideDropDown(true);
    }
  };

  // 댓글 삭제 함수
  const deleteHandler = async () => {
    deleteCommentHandler(comment.id, idx);
  };

  // 시간 계산
  const today = new Date().getTime();
  const commentDate = new Date(comment.createdAt).getTime();

  const timeDifference = Math.floor((today - commentDate) / (1000 * 60));
  let stringTime;
  if (timeDifference === -1) {
    stringTime = `0분 전`;
  } else if (timeDifference < 60) {
    stringTime = `${timeDifference}분 전`;
  } else if (timeDifference / 60 < 24) {
    stringTime = `${Math.floor(timeDifference / 60)}시간 전`;
  } else {
    stringTime = `${Math.floor(timeDifference / (60 * 24))}일 전`;
  }

  return (
    <>
      <div className={style.CommentListBody_comment}>
        <div>{comment.content}</div>
        <Image
          className={style.CommentListBody_setting_img}
          src={"/images/ic_vertical_point_3.svg"}
          width={24}
          height={24}
          alt="설정"
          onClick={dropDownHandler}
        />
        {hideDropDown || (
          <div className={style.CommentListBody_drop_down}>
            <div className={style.drop_down_text} onClick={patchHandler}>
              수정하기
            </div>
            <div className={style.drop_down_text} onClick={deleteHandler}>
              삭제하기
            </div>
          </div>
        )}
      </div>
      <div className={style.CommentListBody_additional_information}>
        <Image
          className={style.CommentListBody_user_img}
          src={"/images/ic_user.svg"}
          width={32}
          height={32}
          alt="유저 이미지"
        />
        <div className={style.CommentListBody_box}>
          <div className={style.CommentListBody_user}>코드잇</div>
          <div className={style.CommentListBody_date}>{stringTime}</div>
        </div>
      </div>
    </>
  );
}
