import ImageContainer from "./ImgContainer";
import emptyCommentImg from "../../public/assets/img_reply_empty.svg";

import styles from "./EmptyComments.module.scss";

export default function EmptyComments() {
  return (
    <div className={styles.EmptyComments}>
      <ImageContainer
        width="140px"
        height="140px"
        src={emptyCommentImg}
        className={styles.img}
      />
      <p>아직 댓글이 없어요, 지금 댓글을 달아보세요!</p>
    </div>
  );
}
