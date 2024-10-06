"use client";

import { useState } from "react";
import classNames from "classnames";

import TextArea from "../../components/TextArea";
import {
  MIN_COMMENT_LENGTH,
  WARN_MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  WARN_MAX_COMMENT_LENGTH,
  VALID_VALUE,
} from "../../constants/comment";

export default function PostCommentMaker({ registComment }) {
  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(undefined);
  const [registBtnDisable, setRegistBtnDisable] = useState(true);

  const commentMakerClass = classNames(
    "w-pc-content",
    "tablet:w-tablet-content",
    "mobile:w-mobile-content"
  );
  const commentTextAreaFrameClass = classNames(
    "w-full",
    "h-comment-text-area-frame",
    "mt-comment-text-area-frame"
  );
  const commentMakerLabelClass = classNames(
    "font-semibold",
    "text-lg",
    "leading-26"
  );
  const commentBottomBarClass = classNames(
    "flex",
    "flex-row",
    "justify-end",
    "w-full",
    "h-4.2rem",
    "mt-1.6rem"
  );

  const handleRegistComment = () => {
    if (commentValid !== VALID_VALUE) {
      return;
    }

    setRegistBtnDisable(true);

    try {
      registComment(comment);
      setComment("");
      setCommentValid(undefined);
    } catch (err) {}
  };

  const validtateComment = (comment) => {
    if (!comment) {
      return undefined;
    }

    const castedComment = comment.toString();

    if (castedComment.length < MIN_COMMENT_LENGTH) {
      setRegistBtnDisable(true);
      return WARN_MIN_COMMENT_LENGTH;
    } else if (MAX_COMMENT_LENGTH < castedComment.length) {
      setRegistBtnDisable(true);
      return WARN_MAX_COMMENT_LENGTH;
    } else {
      setRegistBtnDisable(false);
      return VALID_VALUE;
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const getCommentValid = (valid) => {
    setCommentValid(valid);
  };

  const getCommentWarn = () => {
    if (commentValid === WARN_MIN_COMMENT_LENGTH) {
      return (
        <p className="text-warn">{MIN_COMMENT_LENGTH}자 이상 입력해주세요</p>
      );
    } else if (commentValid === WARN_MAX_COMMENT_LENGTH) {
      return (
        <p className="text-warn">{MAX_COMMENT_LENGTH}자 이하로 입력해주세요</p>
      );
    } else {
      return undefined;
    }
  };

  return (
    <div className={commentMakerClass}>
      <div className={commentMakerLabelClass}>댓글달기</div>
      <div className={commentTextAreaFrameClass}>
        <TextArea
          onChange={handleChangeComment}
          placeholder={"댓글을 입력해주세요."}
          validateFunc={validtateComment}
          getValid={getCommentValid}
          value={comment}
        />
      </div>
      {getCommentWarn()}
      <div className={commentBottomBarClass}>
        <button
          className="btn-comment-regist"
          onClick={handleRegistComment}
          disabled={registBtnDisable}
        />
      </div>
    </div>
  );
}
