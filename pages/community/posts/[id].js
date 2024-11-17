import React from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient, QueryClient, dehydrate } from "react-query";
import Error from "next/error";
import Link from "next/link";
import { formatDate } from "@/utils/dateUtils";
import { formatRelativeTime } from "@/utils/dateRelativeUtils";
import styles from "./style.module.css";
import CommentForm from "@/components/commentForm";
import KebabMenu from "@/components/postDetail/KebabMenu";
import usePostMutation from "@/hooks/usePostMutation";
import { fetchPost, fetchComments } from "@/utils/communityAPI";

const PostDetail = ({ initialPostData, initialCommentsData }) => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(["post", id], () => fetchPost(id), {
    initialData: initialPostData,
    enabled: !!id,
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useQuery(["comments", id], () => fetchComments(id), {
    initialData: initialCommentsData,
    enabled: !!id,
  });

  const { mutate: updatePostMutate } = usePostMutation(
    "updatePost",
    () => {
      queryClient.invalidateQueries(["post", id]);
    },
    (error) => console.error("게시글 수정 실패:", error)
  );

  const { mutate: deletePostMutate } = usePostMutation(
    "deletePost",
    () => {
      router.push("/community");
    },
    (error) => console.error("게시글 삭제 실패:", error)
  );

  const { mutate: updateCommentMutate } = usePostMutation(
    "updateComment",
    () => {
      queryClient.invalidateQueries(["comments", id]);
    },
    (error) => console.error("댓글 수정 실패:", error)
  );

  const { mutate: deleteCommentMutate } = usePostMutation(
    "deleteComment",
    () => {
      queryClient.invalidateQueries(["comments", id]);
    },
    (error) => console.error("댓글 삭제 실패:", error)
  );

  if (isPostLoading || isCommentsLoading) return <div>로딩 중...</div>;
  if (isPostError || isCommentsError) return <Error statusCode={500} />;
  if (!post) return <Error statusCode={404} />;

  const handleEdit = () => {
    const newTitle = prompt("수정할 제목을 입력하세요:", post.title);
    const newContent = prompt("수정할 내용을 입력하세요:", post.content);

    if (newTitle !== null && newContent !== null) {
      updatePostMutate({ id, title: newTitle, content: newContent });
    }
  };

  const handleDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      deletePostMutate(id);
    }
  };

  const handleEditComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    const newContent = prompt(
      "수정할 댓글 내용을 입력하세요:",
      comment.content
    );

    if (newContent !== null && newContent !== comment.content) {
      updateCommentMutate({
        postId: id,
        commentId,
        content: newContent,
      });
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteCommentMutate({ postId: id, commentId });
    }
  };

  const kebabMenuPostOptions = [
    { label: "수정하기", onClick: handleEdit },
    { label: "삭제하기", onClick: handleDelete },
  ];

  const getKebabMenuCommentOptions = (commentId) => [
    { label: "수정하기", onClick: () => handleEditComment(commentId) },
    { label: "삭제하기", onClick: () => handleDeleteComment(commentId) },
  ];

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeadHug}>
        <div className={styles.postTitleKebabHug}>
          <div className={styles.postTitle}>{post.title}</div>
          <KebabMenu options={kebabMenuPostOptions} />
        </div>
        <div className={styles.postInfoLikeHug}>
          <div className={styles.postProfileTextHug}>
            <img src="/images/ic_profile.svg" alt="profile_icon" />
            <div className={styles.postAuthorDateHug}>
              <div className={styles.postAuthor}>{post.author_name}</div>
              <div className={styles.postDate}>
                {formatDate(post.created_at)}
              </div>
            </div>
          </div>
          <div className={styles.postLikeHug}>
            <img src="/images/ic_heartBtn.svg" alt="like_icon" />
            <div className={styles.postLikeValue}>123</div>
          </div>
        </div>
      </div>

      <div className={styles.postContent}>{post.content}</div>

      <CommentForm postId={id} onCommentAdded={refetchComments} />

      <div className={styles.commentSection}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentContent}>
              {comment.content}
              <KebabMenu options={getKebabMenuCommentOptions(comment.id)} />
            </div>
            <div className={styles.commentProfileTextHug}>
              <img
                src="/images/ic_profile.svg"
                alt="profile_icon"
                className={styles.commentProfile}
              />
              <div className={styles.commentMeta}>
                <span className={styles.commentAuthor}>
                  {comment.author_name}
                </span>
                <span className={styles.commentDate}>
                  {formatRelativeTime(comment.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/community" className={styles.returnButton}>
        <div className={styles.returnButtonHug}>
          <div>목록으로 돌아가기</div>
          <img src="/images/ic_return.svg" alt="return_icon" />
        </div>
      </Link>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const queryClient = new QueryClient();

  try {
    const postData = await fetchPost(id);
    const commentsData = await fetchComments(id);

    if (!postData) {
      console.log(`${id} 번 게시글을 찾을 수 없습니다.`);
      return { notFound: true };
    }

    return {
      props: {
        initialPostData: postData || null,
        initialCommentsData: commentsData || [],
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("데이터 요청중 오류:", error);
    return { notFound: true };
  } finally {
    queryClient.clear();
  }
}

export default PostDetail;
