import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, dehydrate, QueryClient } from "react-query";
import { formatDate } from "@/utils/dateUtils";
import SmallButton from "@/components/ui/SmallButton.jsx";
import Error from "next/error";
import Link from "next/link";
import styles from "./style.module.css";
import { formatRelativeTime } from "@/utils/dateRelativeUtils";

const fetchPost = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/${id}`
  );
  if (!response.ok) throw new Error("게시글을 불러오는데 실패했습니다");
  return response.json();
};

const fetchComments = async (postId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/${postId}/comments`
  );
  if (!response.ok) throw new Error("댓글을 불러오는데 실패했습니다");
  return response.json();
};

const postComment = async ({ postId, content }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, author_name: "익명의 판다" }),
    }
  );
  if (!response.ok) throw new Error("댓글 등록에 실패했습니다");
  return response.json();
};

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation(postComment, {
    onSuccess: () => {
      setComment("");
      setError("");
      onCommentAdded();
    },
    onError: (error) => {
      setError("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
      console.error("댓글 등록 오류:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      mutation.mutate({ postId, content: comment });
    } else {
      setError("댓글 내용을 입력해 주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.postCommentsHug}>
        <div className={styles.postCommentTitle}>댓글달기</div>
        <textarea
          className={styles.postCommentsInput}
          placeholder="댓글을 입력해 주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <SmallButton
        type="submit"
        className={styles.floatright}
        disabled={mutation.isLoading || !comment.trim()}
      >
        {mutation.isLoading ? "등록 중..." : "등록"}
      </SmallButton>
    </form>
  );
};
export default function PostDetail({ initialPostData, initialCommentsData }) {
  const router = useRouter();
  const { id } = router.query;

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

  if (isPostLoading || isCommentsLoading) return <div>로딩 중...</div>;
  if (isPostError || isCommentsError) return <Error statusCode={500} />;
  if (!post) return <Error statusCode={404} />;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeadHug}>
        <div className={styles.postTitle}>{post.title}</div>
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
            <div className={styles.commentContent}>{comment.content}</div>
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
          <img src="/images/ic_return.svg" alt="profile_icon" />
        </div>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(["post", id], () => fetchPost(id));
    await queryClient.prefetchQuery(["comments", id], () => fetchComments(id));

    return {
      props: {
        initialPostData: queryClient.getQueryData(["post", id]),
        initialCommentsData: queryClient.getQueryData(["comments", id]),
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  } finally {
    queryClient.clear();
  }
}
