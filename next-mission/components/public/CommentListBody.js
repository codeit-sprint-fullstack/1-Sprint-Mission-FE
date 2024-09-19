import { useState } from "react";
import style from "./CommentListBody.module.css";
import Image from "next/image";

export default function CommentListBody({
  comment,
  deleteCommentHandler,
  idx,
  patchCommentHandler,
  patchComment,
  setPatchComment,
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [value, setValue] = useState(comment.content);
  const [activateButton, setActivateButton] = useState(style.buttonOn);
  const [additionalInformationMargin, setAdditionalInformationMargin] =
    useState(style.noPatch);

  // 설정 드롭다운 온/오프 함수
  const dropDownHandler = () => {
    if (!showDropDown) {
      setShowDropDown(true);
    } else if (showDropDown) {
      setShowDropDown(false);
    }
  };

  // 댓글 수정 시작 함수
  const patchInputHandler = () => {
    if (!patchComment.boolinValue) {
      setPatchComment({
        boolinValue: true,
        contentValue: comment.content,
        id: comment.id,
        idx,
      });
      setShowDropDown(false);
      setAdditionalInformationMargin(style.yesPatch);
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

  // vlaue 값 일치 함수
  const valueChangeHandler = (e) => {
    setValue(e.target.value);

    if (value !== "") {
      setActivateButton(style.buttonOn);
    }
  };

  // 댓글 수정 함수
  const patchHandler = () => {
    if (activateButton === style.buttonOn) {
      if (patchComment.contentValue === value) {
        setPatchComment({
          boolinValue: false,
          contentValue: "",
          id: "",
          idx: "",
        });
      } else {
        patchCommentHandler(value);
        setPatchComment({
          boolinValue: false,
          contentValue: "",
          id: "",
          idx: "",
        });
      }
      setAdditionalInformationMargin(style.noPatch);
    }
  };

  // 댓글 수정 취소 함수
  const patchCancelhandler = () => {
    setValue(comment.content);
    setPatchComment({
      boolinValue: false,
      contentValue: "",
      id: "",
      idx: "",
    });
    setAdditionalInformationMargin(style.noPatch);
  };

  // 버튼 비/활성화 함수
  const buttonChangeHAndler = () => {
    if (value === "") {
      setActivateButton(style.buttonOff);
    } else {
      setActivateButton(style.buttonOn);
    }
  };

  return (
    <>
      {patchComment.boolinValue || (
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
              <div className={style.dropDownText} onClick={patchInputHandler}>
                수정하기
              </div>
              <div className={style.dropDownText} onClick={deleteHandler}>
                삭제하기
              </div>
            </div>
          )}
        </div>
      )}
      {patchComment.boolinValue && (
        <textarea
          className={style.patchInput}
          value={value}
          onChange={valueChangeHandler}
          onKeyUp={buttonChangeHAndler}
        />
      )}
      <div
        className={`${style.additionalInformation} ${additionalInformationMargin}`}
      >
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
        {patchComment.boolinValue && (
          <div className={style.buttonContaner}>
            <button className={style.cancelButton} onClick={patchCancelhandler}>취소</button>
            <button className={`${style.patchbutton} ${activateButton}`} onClick={patchHandler}>수정 완료</button>
          </div>
        )}
      </div>
    </>
  );
}
