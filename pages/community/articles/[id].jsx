import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient, QueryClient, dehydrate } from "react-query";
import Error from "next/error";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import styles from "./style.module.css";
import CommentForm from "@/components/commentForm";
import KebabMenu from "@/components/postDetail/KebabMenu";
import usePostMutation from "@/hooks/usePostMutation";
import { fetchPost, fetchComments } from "@/utils/communityAPI";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/hooks/useAuth";

const PostDetail = ({ initialPostData, initialCommentsData }) => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { showModal } = useModal();
  const { user } = useAuth();

  // 게시글 데이터 가져오기
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(["post", id], () => fetchPost(id), {
    initialData: initialPostData,
    enabled: !!id,
  });

  // 댓글 데이터 가져오기
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useQuery(["comments", id], () => fetchComments(id), {
    initialData: initialCommentsData,
    enabled: !!id,
  });

  // 게시글 수정 뮤테이션
  const { mutate: updatePostMutate } = usePostMutation(
    "updatePost",
    () => {
      queryClient.invalidateQueries(["post", id]);
    },
    (error) => {
      console.error("게시글 수정 실패:", error);
      showModal({
        content: "게시글 수정에 실패했습니다. 다시 시도해주세요.",
        confirmText: "확인",
        mode: "error",
      });
    }
  );

  // 게시글 삭제 뮤테이션
  const { mutate: deletePostMutate } = usePostMutation(
    "deletePost",
    () => {
      router.push("/community");
    },
    (error) => {
      console.error("게시글 삭제 실패:", error);
      showModal({
        content: "게시글 삭제에 실패했습니다. 다시 시도해주세요.",
        confirmText: "확인",
        mode: "error",
      });
    }
  );

  // 댓글 수정 뮤테이션
  const { mutate: updateCommentMutate } = usePostMutation(
    "updateComment",
    () => {
      queryClient.invalidateQueries(["comments", id]);
      setEditingCommentId(null);
    },
    (error) => {
      console.error("댓글 수정 실패:", error);
      showModal({
        content: "댓글 수정에 실패했습니다. 다시 시도해주세요.",
        confirmText: "확인",
        mode: "error",
      });
    }
  );

  // 댓글 삭제 뮤테이션
  const { mutate: deleteCommentMutate } = usePostMutation(
    "deleteComment",
    () => {
      queryClient.invalidateQueries(["comments", id]);
    },
    (error) => {
      console.error("댓글 삭제 실패:", error);
      showModal({
        content: "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
        confirmText: "확인",
        mode: "error",
      });
    }
  );

  // 로딩 및 오류 처리
  if (isPostLoading || isCommentsLoading) return <div>로딩 중...</div>;
  if (isPostError || isCommentsError) return <Error statusCode={500} />;
  if (!post) return <Error statusCode={404} />;

  // 게시글 수정 핸들러
  const handleEdit = () => {
    if (user && user.id === post.writerId) {
      showModal({
        content: (
          <div>
            <input
              type="text"
              defaultValue={post.title}
              onChange={(e) => (post.title = e.target.value)}
              placeholder="제목"
            />
            <textarea
              defaultValue={post.content}
              onChange={(e) => (post.content = e.target.value)}
              placeholder="내용"
            />
          </div>
        ),
        onConfirm: () =>
          updatePostMutate({ id, title: post.title, content: post.content }),
        confirmText: "수정",
        cancelText: "취소",
        showCancel: true,
        mode: "custom",
      });
    } else {
      showModal({
        content: "게시글 작성자만 수정할 수 있습니다.",
        confirmText: "확인",
        mode: "error",
      });
    }
  };

  // 게시글 삭제 핸들러
  const handleDelete = () => {
    if (user && user.id === post.writerId) {
      showModal({
        content: "정말로 이 게시글을 삭제하시겠습니까?",
        onConfirm: () => deletePostMutate(id),
        confirmText: "삭제",
        cancelText: "취소",
        showCancel: true,
        mode: "warning",
      });
    } else {
      showModal({
        content: "게시글 작성자만 삭제할 수 있습니다.",
        confirmText: "확인",
        mode: "error",
      });
    }
  };

  const handleEditComment = (commentId, content, commentWriterId) => {
    if (user && user.id === commentWriterId) {
      showModal({
        content: (
          <textarea
            defaultValue={content}
            onChange={(e) => (content = e.target.value)}
            placeholder="댓글 내용"
          />
        ),
        onConfirm: () =>
          updateCommentMutate({ articleId: id, commentId, content }),
        confirmText: "수정",
        cancelText: "취소",
        showCancel: true,
        mode: "custom",
      });
    } else {
      showModal({
        content: "댓글 작성자만 수정할 수 있습니다.",
        confirmText: "확인",
        mode: "error",
      });
    }
  };

  const handleDeleteComment = (commentId, commentWriterId) => {
    if (user && user.id === commentWriterId) {
      showModal({
        content: "정말로 이 댓글을 삭제하시겠습니까?",
        onConfirm: () => deleteCommentMutate({ articleId: id, commentId }),
        confirmText: "삭제",
        cancelText: "취소",
        showCancel: true,
        mode: "warning",
      });
    } else {
      showModal({
        content: "댓글 작성자만 삭제할 수 있습니다.",
        confirmText: "확인",
        mode: "error",
      });
    }
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  const kebabMenuPostOptions = [
    { label: "수정하기", onClick: handleEdit },
    { label: "삭제하기", onClick: handleDelete },
  ];

  const getKebabMenuCommentOptions = (commentId, content, commentWriterId) => [
    {
      label: "수정하기",
      onClick: () => handleEditComment(commentId, content, commentWriterId),
    },
    {
      label: "삭제하기",
      onClick: () => handleDeleteComment(commentId, commentWriterId),
    },
  ];

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeadHug}>
        <div className={styles.postTitleKebabHug}>
          <div className={styles.postTitle}>{post.title}</div>
          {user && user.id === post.writerId && (
            <KebabMenu options={kebabMenuPostOptions} />
          )}
        </div>
        <div className={styles.postInfoLikeHug}>
          <div className={styles.postProfileTextHug}>
            <img
              src={post.writer.image || "/images/ic_profile.svg"}
              alt="profile_icon"
            />
            <div className={styles.postAuthorDateHug}>
              <div className={styles.postAuthor}>{post.writer.nickname}</div>
              <div className={styles.postDate}>
                {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
          <div className={styles.postLikeHug}>
            <img src="/images/ic_heartBtn.svg" alt="like_icon" />
            <div className={styles.postLikeValue}>{post.likeCount}</div>
          </div>
        </div>
      </div>

      <div className={styles.postContent}>{post.content}</div>

      <CommentForm
        articleId={id}
        userId={user ? user.id : null}
        onCommentAdded={refetchComments}
      />

      <div className={styles.commentSection}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentContent}>
              {comment.content}
              {user && user.id === comment.writerId && (
                <KebabMenu
                  options={getKebabMenuCommentOptions(
                    comment.id,
                    comment.content,
                    comment.writerId
                  )}
                />
              )}
            </div>
            <div className={styles.commentProfileTextHug}>
              <img
                src={comment.writer.image || "/images/ic_profile.svg"}
                alt="profile_icon"
                className={styles.commentProfile}
              />
              <div className={styles.commentMeta}>
                <span className={styles.commentAuthor}>
                  {comment.writer.nickname}
                </span>
                <span className={styles.commentDate}>
                  {formatDate(comment.createdAt)}
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

// 서버 사이드에서 초기 데이터 가져오기
export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const postId = context.params.id;

  // 게시글 데이터와 댓글 데이터 미리 가져오기
  await queryClient.prefetchQuery(["post", postId], () => fetchPost(postId));
  await queryClient.prefetchQuery(["comments", postId], () =>
    fetchComments(postId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialPostData: await fetchPost(postId),
      initialCommentsData: await fetchComments(postId),
    },
  };
}

export default PostDetail;
