import { calculateTimeAgo } from "@/lib/utils";
import KebabMenu from "../ui/KebabMenu";
import ProfileImg from "../ui/ProfileImg";
import styles from "./CommentList.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticleComments } from "@/lib/api";
import EmptyComments from "../ui/EmptyComment";
import Loader from "../ui/Loader";
import Msg from "../ui/Msg";
import { articleKey } from "@/variables/queryKeys";

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

export default function CommentList({ articleId }) {
  const { isPending, isError, error, data } = useInfiniteQuery({
    queryKey: articleKey.comments(articleId),
    queryFn: ({ queryKey, pageParam = null }) => {
      const articleId = queryKey[2];
      return getArticleComments(articleId, { cursor: pageParam });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!articleId,
  });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Msg type="error" msg={errMsg} />;
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
