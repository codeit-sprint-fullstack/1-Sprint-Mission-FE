import { calculateTimeAgo } from "@/lib/utils";
import KebabMenu from "../ui/KebabMenu";
import ProfileImg from "../ui/ProfileImg";
import styles from "./CommentList.module.scss";

function CommentContent({ comment }) {
  return (
    <>
      <div className={styles.top}>
        <h4>{comment.title}</h4>
        <KebabMenu />
      </div>

      <div className={styles.bottom}>
        <ProfileImg width="32px" />
        <div className={styles["bottom-right"]}>
          <p>{comment.writer.nickname || "똑똑한 판다"}</p>
          <time>{calculateTimeAgo(comment.createdAt)}</time>
        </div>
      </div>
    </>
  );
}

export default function CommentList({ data }) {
  if (!data) return <div> comment data가 없음</div>;

  return (
    <ul className={styles.CommentList}>
      {data.map((page) => {
        return page.map((comment) => {
          <li key={comment.id}>
            <CommentContent comment={comment} />
          </li>;
        });
      })}
    </ul>
  );
}
