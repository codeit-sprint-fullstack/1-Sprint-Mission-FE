import Profile from "./Profile";
import LastTime from "./LastTime";
import DropDownKebabComment from "./DropdownKebabComment";
import { PROFILE_H32 } from "../constants/Profile";

import style from "./comment.module.css";

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
  const topBarClass = `flex flex-row justify-between`;
  const contentClass = `font-normal ${style.content}`;
  const bottomBarClass = `flex flex-row ${style["bottom-bar"]}`;
  const bottomBarNicknameDateSetClass = `flex flex-col ${style["nickname-last-time-set"]}`;
  const nicknameClass = `${style.nickname}`;

  const handleModifyComment = (newComment) => {
    // updateComment(commentId, newComment);
    // api 함수 실행이 아닌 수정 ui 출력 or 별도의 함수로 ui 호출하도록
  };
  const handleDeleteComment = () => {
    deleteComment(commentId);
  };

  return (
    <div className={style.comment}>
      <div className={topBarClass}>
        <div className={contentClass}>{content}</div>
        <DropDownKebabComment
          commentId={commentId}
          ownerId={ownerId}
          onModify={handleModifyComment}
          onDelete={handleDeleteComment}
        />
      </div>
      <div className={bottomBarClass}>
        <Profile type={PROFILE_H32} profileImgUrl={profileImgUrl} />
        <div className={bottomBarNicknameDateSetClass}>
          <div className={nicknameClass}>{nickname}</div>
          <LastTime dbDate={date} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
