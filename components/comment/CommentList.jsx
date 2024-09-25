import { useGetCommentList } from "@/service/queries";
import styles from "./CommentList.module.scss";
import EmptyComments from "../ui/EmptyComment";
import Loader from "../ui/Loader";
import Message from "../ui/Message";
import CommentContent from "./CommentContent";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function CommentList({ idPath, entity }) {
  const { ref, inView } = useInView();

  const {
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isPending,
    isError,
    error,
    data,
  } = useGetCommentList({
    idPath,
    entity,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, inView, hasNextPage, fetchNextPage]);

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
    <>
      <ul className={styles.CommentList}>
        {pages.map((page) => {
          return page.list.map((comment) => {
            return (
              <CommentContent
                comment={comment}
                key={comment.id}
                idPath={idPath}
              />
            );
          });
        })}
      </ul>
      <div ref={ref}>
        {isFetchingNextPage ? (
          <Loader msg="더 불러오는중" />
        ) : hasNextPage ? (
          <Loader msg="새 댓글 불러오는 중" />
        ) : (
          <Message msg="더 불러올 댓글이 없습니다" />
        )}
      </div>
    </>
  );
}
