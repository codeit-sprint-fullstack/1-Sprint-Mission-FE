import Image from "next/image";
import styles from "./LikeButton.module.scss";
import { formatLikes } from "@/utils/formatFn";
import assets from "@/variables/images";

export function LikeNumber({ data, size }) {
  const likeNum = data?.favoriteCount || data?.likeCount;
  assets.icons.inactiveHeart;
  const likeIcon = data?.isFavorite
    ? assets.icons.heartActive
    : assets.icons.heartInactive;

  return (
    <div className={styles.LikeNumber}>
      <Image src={likeIcon} alt="likes icon" width={size} height={size} />
      <span>{formatLikes(likeNum)}</span>
    </div>
  );
}

export default function LikeButton({ data, size = 32, onClick = null }) {
  return (
    <button className={styles.LikeButton} onClick={onClick}>
      <LikeNumber data={data} size={size} />
    </button>
  );
}
