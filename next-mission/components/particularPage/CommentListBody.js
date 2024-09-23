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
  const [showDropDown, setShowDropDown] = useState(false);

  // 설정 드롭다운 온/오프 함수
  const dropDownHandler = () => {
    if (!showDropDown) {
      setShowDropDown(true);
    } else if (showDropDown) {
      setShowDropDown(false);
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
      setShowDropDown(false);
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
  console.log(comment.content)

  return (
    <>
      <div className={style.contaner}>
        <div>{comment.content}</div>
        <Image
          className={style.settingImg}
          src={"/images/ic_vertical_point_3.svg"}
          width={24}
          height={24}
          alt="설정"
          onClick={dropDownHandler}
        />
        {showDropDown && (
          <div className={style.dropDown}>
            <div className={style.dropDownText} onClick={patchHandler}>
              수정하기
            </div>
            <div className={style.dropDownText} onClick={deleteHandler}>
              삭제하기
            </div>
          </div>
        )}
      </div>
      <div className={style.additionalInformation}>
        <Image
          className={style.userImg}
          src={"/images/ic_user.svg"}
          width={32}
          height={32}
          alt="유저 이미지"
        />
        <div className={style.additionalInformationBox}>
          <div className={style.userName}>코드잇</div>
          <div className={style.date}>{stringTime}</div>
        </div>
      </div>
    </>
  );
}
