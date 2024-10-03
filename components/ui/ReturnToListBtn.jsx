import Link from "next/link";
import styles from "./ReturnToListBtn.module.scss";
import assets from "@/variables/images";
import { IconContainer } from "./ImgContainers";

export default function ReturnToListBtn({ isArticle = true }) {
  const path = isArticle ? "/forum" : "/products";
  return (
    <Link href={path}>
      <button className={styles.ReturnToListBtn}>
        <span>목록으로 돌아가기</span>
        <IconContainer src={assets.icons.arrowReturn} alt="return icon" />
      </button>
    </Link>
  );
}
