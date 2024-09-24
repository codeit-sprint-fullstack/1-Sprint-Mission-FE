import classNames from "classnames";

import style from "./product-preview-favorite.module.css";

export default function ProductPreviewFavorite({
  productId,
  isFavorite,
  favriteCount,
}) {
  // let heartClass = classNames("w-1.6rem", "h-1.6rem", style["heart-empty"]);
  let heartClass = classNames("w-1.6rem", "h-1.6rem");

  if (isFavorite) {
    heartClass = classNames(heartClass, style["heart-full"]);
  } else {
    heartClass = classNames(heartClass, style["heart-empty"]);
  }

  const countClass = classNames(
    "text-xs",
    "leading-18",
    "font-medium",
    "ml-0.4rem"
  );

  const count = favriteCount > 9999 ? "9999+" : favriteCount;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    // productId 좋아요 설정
  };

  return (
    <div className="flex flex-row">
      <button className={heartClass} onClick={handleFavoriteClick} />
      <p className={countClass}>{count}</p>
    </div>
  );
}
