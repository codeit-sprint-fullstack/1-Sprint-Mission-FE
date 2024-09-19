import { useCommentList } from "@/service/queries";
import styles from "./CommentList.module.scss";
import EmptyComments from "../ui/EmptyComment";
import Loader from "../ui/Loader";
import Message from "../ui/Message";
import CommentContent from "./CommentContent";

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
          return <CommentContent comment={comment} key={comment.id} />;
        });
      })}
    </ul>
  );
}
