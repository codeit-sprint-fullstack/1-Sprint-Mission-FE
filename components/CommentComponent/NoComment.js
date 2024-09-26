import Image from "next/image";
import styles from "./NoComment.module.css";
import noComment from "@/images/Img_reply_empty.png";

export default function NoComment() {
  return (
    <div className={styles.container}>
      <Image src={noComment} alt="noComment" />
      <span className={styles.emptyComment}>
        아직 댓글이 없어요, <br />
        지금 댓글을 달아보세요!
      </span>
    </div>
  );
}
