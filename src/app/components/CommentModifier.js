"ues client";

import { useForm } from "react-hook-form";
import classNames from "classnames";

import Profile from "./Profile";
import LastTime from "./LastTime";
import { PROFILE_H32 } from "../constants/Profile";
import { MIN_COMMENT_LENGTH } from "../constants/comment";

export default function CommentModifier({
  updateComment,
  content,
  profileImgUrl,
  nickname,
  date,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const commentModifierClass = classNames("content");
  const bottomBarClass = classNames(
    "mt-2.4rem",
    "flex",
    "flex-row",
    "justify-between"
  );

  const handleModify = () => {
    updateComment(watch("updatedComment"));
  };

  const handleCancelModify = () => {};

  return (
    <div className={commentModifierClass}>
      <form onSubmit={handleSubmit(handleModify)}>
        <textarea
          className="comment-modifier__textarea"
          defaultValue={content}
          {...register("updatedComment", {
            required: "댓글 내용을 입력해주세요",
            validate: (value) =>
              value.trim().length > 0 ||
              `${MIN_COMMENT_LENGTH}자 이상 입력해주세요`,
          })}
        />
        {errors.updatedComment && (
          <p className="warning-text">{errors.updatedComment.message}</p>
        )}
      </form>
      <div className={bottomBarClass}>
        <div className="flex flex-row">
          <Profile type={PROFILE_H32} profileImgUrl={profileImgUrl} />
          <div className="comment__nickname-last-date">
            <div className="comment__nickname">{nickname}</div>
            <LastTime dbDate={date} />
          </div>
        </div>
        <div className="flex flex-row gap-0.4rem">
          <button
            className="comment-modifier__btn-complete-cancel"
            onClick={handleCancelModify}
          >
            취소
          </button>
          <button
            className="comment-modifier__btn-complete-modify"
            onClick={handleModify}
          />
        </div>
      </div>
    </div>
  );
}
