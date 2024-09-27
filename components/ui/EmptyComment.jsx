import { ImageContainer } from "./ImgContainers";
import styles from "./EmptyComments.module.scss";
import assets from "@/variables/images";

export default function EmptyComments() {
  return (
    <div className={styles.EmptyComments}>
      <ImageContainer
        width="140px"
        src={assets.images.replyEmpty}
        priority={true}
      />
      <p>아직 댓글이 없어요, 지금 댓글을 달아보세요!</p>
    </div>
  );
}
