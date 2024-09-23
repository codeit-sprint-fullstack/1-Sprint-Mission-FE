import Link from "next/link";
import Image from "next/image";
import returnIcon from "@/public/assets/icons/ic_arrow_return.svg";
import styles from "./ReturnToListBtn.module.scss";

export default function ReturnToListBtn({ isArticle = true }) {
  const path = isArticle ? "/forum" : "/products";
  return (
    <Link href={path}>
      <button className={styles.ReturnToListBtn}>
        <span>목록으로 돌아가기</span>
        <Image src={returnIcon} alt="return icon" width={24} height={24} />
      </button>
    </Link>
  );
}
