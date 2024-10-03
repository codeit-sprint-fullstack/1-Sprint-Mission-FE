import Image from "next/image";
import styles from "./NoComments.module.css";

export default function NoComments() {
  return (
    <div className={styles.noComments}>
      <Image
        src="/images/Img_inquiry_empty.png"
        alt="No comments"
        width={200}
        height={208}
      />
      <p className={styles.pNoComments}>아직 문의가 없어요</p>
    </div>
  );
}
