import Image from "next/image";
import classNames from "classnames";

export interface PostPreviewFavoriteProps {
  isFavorite: boolean;
  favriteCount: number;
}

// 삭제 예정. preview 상태에서 좋아요 추가 안되게 기능 변경 예정
export default function PostPreviewFavorite({
  isFavorite,
  favriteCount,
}: PostPreviewFavoriteProps) {
  const postPreviewFavoriteClass = classNames(
    "flex",
    "flex-row",
    "gap-[0.8rem]"
  );
  const heartImgFrameClass = classNames("w-[2.4rem]", "h-[2.4rem]", "relative");

  let heartImg = "/icons/ic_heart_empty.svg";
  if (isFavorite) {
    heartImg = "/icons/ic_heart_full.svg";
  }

  const countClass = classNames(
    "flex",
    "flex-row",
    "text-lg",
    "leading-[2.6rem]",
    "items-center",
    "font-normal",
    "text-gray-500"
  );

  const count: number | string = favriteCount > 9999 ? "9999+" : favriteCount;

  return (
    <div className={postPreviewFavoriteClass}>
      <div className={heartImgFrameClass}>
        <Image src={heartImg} alt="좋아요 마크" fill />
      </div>

      <p className={countClass}>{count}</p>
    </div>
  );
}
