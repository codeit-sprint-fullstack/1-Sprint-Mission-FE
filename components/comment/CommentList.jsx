import { calculateTimeAgo } from "@/utils/formatFn";
import { useCommentList } from "@/service/queries";
import KebabMenu from "../ui/KebabMenu";
import ProfileImg from "../ui/ProfileImg";
import styles from "./CommentList.module.scss";
import EmptyComments from "../ui/EmptyComment";
import Loader from "../ui/Loader";
import Message from "../ui/Message";

function CommentContent({ comment }) {
  return (
    <>
      <div className={styles.top}>
        <h4>{comment.content}</h4>
        <KebabMenu />
      </div>

      <div className={styles.bottom}>
        <ProfileImg width="32px" />
        <div className={styles["bottom-right"]}>
          <p>{comment.writer?.nickname || "똑똑한 판다"}</p>
          <time>{calculateTimeAgo(comment.createdAt)}</time>
        </div>
      </div>
    </>
  );
}

export default function CommentList({ idPath, isArticle }) {
  const { isPending, isError, error, data } = useCommentList({
    idPath,
    whichId: isArticle ? "article" : "product",
  });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  if (!data) return <div> comment data가 없음</div>;

  const pages = data?.pages || [];

  const isEmpty = pages[0].list.length === 0;

  return isEmpty ? (
    <EmptyComments />
  ) : (
    <ul className={styles.CommentList}>
      {pages.map((page) => {
        return page.list.map((comment) => {
          return (
            <li className={styles.list} key={comment.id}>
              <CommentContent comment={comment} />
            </li>
          );
        });
      })}
    </ul>
  );
}
