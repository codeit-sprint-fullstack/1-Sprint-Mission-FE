import Profile from "./Profile";
import LastTime from "./LastTime";
import DropDownKebabComment from "./DropdownKebabComment";
import { PROFILE_H32 } from "../constants/Profile";

import style from "./comment.module.css";

export function Comment({ content, profileImgUrl, nickname, date, commentId }) {
  const topBarClass = `flex flex-row justify-between`;
  const contentClass = `font-normal ${style.content}`;
  const bottomBarClass = `flex flex-row ${style["bottom-bar"]}`;
  const bottomBarNicknameDateSetClass = `flex flex-col ${style["nickname-last-time-set"]}`;
  const nicknameClass = `${style.nickname}`;

  return (
    <div className={style.comment}>
      <div className={topBarClass}>
        <div className={contentClass}>{content}</div>
        {/* <button className={style["btn-ellipsis"]} /> */}
        <DropDownKebabComment commentId={commentId} />
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
