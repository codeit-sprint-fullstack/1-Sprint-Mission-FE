import Image from "next/image";
import styles from "./LikeButton.module.scss";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import activeHeart from "../../public/assets/icons/ic_heart_active.svg";
import { formatLikes } from "@/utils/formatFn";

export function LikeNumber({ data, size }) {
  const likeNum = data?.favoriteCount || data?.likeCount;

  const likeIcon = data?.isFavorite ? activeHeart : inactiveHeart;
  return (
    <div className={styles.LikeNumber}>
      <Image src={likeIcon} alt="likes icon" width={size} height={size} />
      <span>{formatLikes(likeNum)}</span>
    </div>
  );
}

export default function LikeButton({ data, size = 32 }) {
  return (
    <button className={styles.LikeButton}>
      <LikeNumber data={data} size={size} />
    </button>
  );
}
