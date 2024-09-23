import Image from "next/image";
import styles from "./LikeButton.module.scss";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import activeHeart from "../../public/assets/icons/ic_heart_active.svg";
import { formatLikes } from "@/utils/formatFn";

export default function LikeButton({ data }) {
  const likeNum = data?.favoriteCount || data?.likeCount;

  const likeIcon = data?.isFavorite ? activeHeart : inactiveHeart;

  return (
    <button className={styles.LikeButton}>
      <Image src={likeIcon} alt="likes icon" width={32} height={32} />
      <span>{formatLikes(likeNum)}</span>
    </button>
  );
}
