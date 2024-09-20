"use client";

import { useEffect, useState } from "react";

import { createArticleComment } from "@/lib/axios";
import TextArea from "./TextArea";
import {
  MIN_COMMENT_LENGTH,
  WARN_MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  WARN_MAX_COMMENT_LENGTH,
  VALID_VALUE,
} from "../constants/comment";

import style from "./comment-maker.module.css";

export function CommentMaker({ articleId, registComment }) {
  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(undefined);
  const [registBtnDisable, setRegistBtnDisable] = useState(true);

  const commentMakerLabelClass = `font-semibold ${style["comment-maker-label"]}`;
  const commentBottomBarClass = `flex-row justify-end ${style["comment-bottom-bar"]}`;

  const handleRegistComment = () => {
    if (commentValid !== VALID_VALUE) {
      return;
    }

    setRegistBtnDisable(true);

    createArticleComment(articleId, comment).then((data) => {
      setComment("");
      setCommentValid(undefined);
      registComment();
    });
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
    <div className={style["comment-maker"]}>
      <div className={commentMakerLabelClass}>댓글달기</div>
      <div className={style["comment-text-area-frame"]}>
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
          className={style["btn-regist"]}
          onClick={handleRegistComment}
          disabled={registBtnDisable}
        />
      </div>
    </div>
  );
}

export default CommentMaker;
