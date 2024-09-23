import Image from "next/image";
import styles from "./NoComments.module.css";

export default function NoComments() {
  return (
    <div className={styles.noComments}>
      <Image
        src="/images/Img_inquiry_empty.png"
        alt="No comments"
        width={151}
        height={208}
      />
    </div>
  );
}
