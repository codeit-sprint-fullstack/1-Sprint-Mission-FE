"use client";

import { useState } from "react";
import classNames from "classnames";

import CommentModifier from "./CommentModifier";
import Profile from "./Profile";
import LastTime from "./LastTime";
import DropDownKebabComment from "./DropdownKebabComment";
import { PROFILE_H32 } from "../constants/Profile";

export function Comment({
  content,
  ownerId,
  profileImgUrl,
  nickname,
  date,
  commentId,
  updateComment,
  deleteComment,
}) {
  const [isModified, setIsModified] = useState(false);
  const commentClass = classNames("content", "comment");
  const topBarClass = classNames("flex", "flex-row", "justify-between");
  const contentClass = classNames(
    "text-md",
    "leading-24",
    "text-gray-800",
    "font-normal"
  );
  const bottomBarClass = classNames("flex", "flex-row", "mt-2.4rem");

  const handleModifyComment = (newComment) => {
    updateComment({ commentId, content: newComment });
    // 임시로 100% 성공 한다는 전제로 modifier 미출력
    // react-query로 상위 태그에서 관리하다보니, 성공/실패여부도 상위에서 다시 받아서 처리하는 방식을 해야하나?
    setIsModified(false);
  };

  const handleDeleteComment = () => {
    deleteComment(commentId);
  };

  const handleShowModifier = () => {
    setIsModified(true);
  };

  return isModified ? (
    <CommentModifier
      updateComment={handleModifyComment}
      content={content}
      profileImgUrl={profileImgUrl}
      nickname={nickname}
      date={date}
    />
  ) : (
    <div className={commentClass}>
      <div className={topBarClass}>
        <div className={contentClass}>{content}</div>
        <DropDownKebabComment
          commentId={commentId}
          ownerId={ownerId}
          onModify={handleShowModifier}
          onDelete={handleDeleteComment}
        />
      </div>
      <div className={bottomBarClass}>
        <Profile type={PROFILE_H32} profileImgUrl={profileImgUrl} />
        <div className="comment__nickname-last-date">
          <div className="comment__nickname">{nickname}</div>
          <LastTime dbDate={date} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
