import classNames from "classnames";

export interface ProductPreviewFavoriteProps {
  isFavorite: boolean;
  favriteCount: number;
}

// 삭제 예정. preview 상태에서 좋아요 추가 안되게 기능 변경 예정
export default function ProductPreviewFavorite({
  isFavorite,
  favriteCount,
}: ProductPreviewFavoriteProps) {
  let heartClass = classNames("w-[1.6rem]", "h-[1.6rem]");

  if (isFavorite) {
    heartClass = classNames(heartClass, "bg-favorite-heart--full");
  } else {
    heartClass = classNames(heartClass, "bg-favorite-heart--empty");
  }

  const countClass = classNames(
    "text-xs",
    "leading-[1.8rem]",
    "font-medium",
    "ml-[0.4rem]"
  );

  const count: number | string = favriteCount > 9999 ? "9999+" : favriteCount;

  return (
    <div className="flex flex-row">
      <button className={heartClass} />
      <p className={countClass}>{count}</p>
    </div>
  );
}
