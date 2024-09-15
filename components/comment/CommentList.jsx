import { calculateTimeAgo } from "@/lib/utils";
import KebabMenu from "../ui/KebabMenu";
import ProfileImg from "../ui/ProfileImg";
import styles from "./CommentList.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticleComments } from "@/lib/api";
import { useRouter } from "next/router";
import EmptyComments from "../ui/EmptyComment";

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

export default function CommentList() {
  const router = useRouter();
  const { articleId } = router.query;

  const { isPending, isError, error, data } = useInfiniteQuery({
    queryKey: ["comments", articleId],
    queryFn: ({ queryKey, pageParam = null }) => {
      const articleId = queryKey[1];
      return getArticleComments(articleId, { cursor: pageParam });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (isPending) return <div>로딩중</div>;
  if (isError) {
    const errMsg = error?.message;
    return <div>{errMsg}</div>;
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
