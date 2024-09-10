import Profile from "./Profile";
import Date from "./Date";
import { PROFILE_H32 } from "../constants/Profile";

import style from "./comment.module.css";

export function Comment({
  content,
  profileImgUrl,
  ownerName,
  date,
  favoriteCount,
  myFavorite = false,
}) {
  const topBarClass = `flex-row justify-between`;
  const contentClass = `font-normal ${style.content}`;
  const bottomBarClass = `flex-row`;
  const bottomBarOwnerDateSet = `flex-col`;
  const ownerClass = `${style.owner}`;
  const lastTimeClass = ``;

  const lastTime = lastTimeByTimeZone(date);

  return (
    <div className={style.comment}>
      <div className={topBarClass}>
        <div className={contentClass}>{content}</div>
        <button className={style["btn-ellipsis"]}>...</button>
      </div>
      <div className={bottomBarClass}>
        <Profile type={PROFILE_H32} favoriteCount={favoriteCount} />
        <div className={bottomBarOwnerDateSet}>
          <div className={ownerClass}>{ownerName}</div>
          <Date />
        </div>
      </div>
    </div>
  );
}

export default Comment;
