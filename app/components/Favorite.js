import { BEST_POST, POST_PREVIEW, POST_DETAIL } from "../constants/Favorite";

import style from "./favorite.module.css";

export function Favorite({ type, myFavorite, favoriteCount }) {
  let favorite = undefined;

  const bestPostFavoriteClass = `flex flex-row items-center ${style["style.best-post-favorite"]}`;
  let bestPostFavoriteImgClass = ` ${style["best-post-favorite-img"]}`;
  const bestPostFavoriteCountClass = `flex flex-row items-center font-normal text-gray-500 ${style["best-post-favorite-count"]}`;

  const postPreviewFavoriteClass = `flex flex-row items-center ${style["style.post-preview-favorite"]}`;
  let postPreviewFavoriteImgClass = ` ${style["post-preview-favorite-img"]}`;
  const postPreviewFavoriteCountClass = `flex flex-row items-center font-normal text-gray-500 ${style["post-preview-favorite-count"]}`;

  const postDetailFavoriteClass = `flex flex-row items-center ${style["style.post-detail-favorite"]}`;
  let postDetailFavoriteImgClass = ` ${style["post-detail-favorite-img"]}`;
  const postDetailFavoriteCountClass = `flex flex-row items-center font-medium text-gray-500 ${style["post-detail-favorite-count"]}`;

  let favoriteCountText = favoriteCount < 9999 ? favoriteCount : "9999+";

  switch (type) {
    case BEST_POST: {
      favorite = (
        <div className={bestPostFavoriteClass}>
          <img className={bestPostFavoriteImgClass} />
          <div className={bestPostFavoriteCountClass}>{favoriteCountText}</div>
        </div>
      );
      break;
    }
    case POST_PREVIEW: {
      favorite = (
        <div className={postPreviewFavoriteClass}>
          <img className={postPreviewFavoriteImgClass} />
          <div className={postPreviewFavoriteCountClass}>
            {favoriteCountText}
          </div>
        </div>
      );
      break;
    }
    case POST_DETAIL: {
      favorite = (
        <div className={postDetailFavoriteClass}>
          <img className={postDetailFavoriteImgClass} />
          <div className={postDetailFavoriteCountClass}>
            {favoriteCountText}
          </div>
        </div>
      );
      break;
    }
  }

  return favorite;
}

export default Favorite;
