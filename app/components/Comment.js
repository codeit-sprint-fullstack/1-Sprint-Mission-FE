import Profile from "./Profile";
import Date from "./Date";
import { PROFILE_H32 } from "../constants/Profile";
import { LAST_TIME } from "../constants/date";

import style from "./comment.module.css";

export function Comment({ content, profileImgUrl, nickname, date }) {
  const topBarClass = `flex-row justify-between`;
  const contentClass = `font-normal ${style.content}`;
  const bottomBarClass = `flex-row ${style["bottom-bar"]}`;
  const bottomBarNicknameDateSetClass = `flex-col ${style["nickname-last-time-set"]}`;
  const nicknameClass = `${style.nickname}`;

  return (
    <div className={style.comment}>
      <div className={topBarClass}>
        <div className={contentClass}>{content}</div>
        <button className={style["btn-ellipsis"]} />
      </div>
      <div className={bottomBarClass}>
        <Profile type={PROFILE_H32} profileImgUrl={profileImgUrl} />
        <div className={bottomBarNicknameDateSetClass}>
          <div className={nicknameClass}>{nickname}</div>
          <Date type={LAST_TIME} dbDate={date} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
