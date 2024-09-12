import styles from "@styles/PostDetail.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "@/lib/axios";
import KebabDropdown from "@components/KebabDropdown";
import Comment from "@components/Comment";
import { useRouter } from "next/router";

import profileImage from "@images/ic_profile.svg";
import emptyHeart from "@images/favoriteEmptyHeart-small.png";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const postRes = await axios.get(`/articles/${id}`);
    const post = postRes.data;

    const commentsRes = await axios.get(`/comments/articles/${id}/comments`);
    const initialComments = commentsRes.data.comments;

    return {
      props: {
        post,
        initialComments,
      },
    };
  } catch (error) {
    console.error("데이터 fetch에 실패했습니다:", error);
    return {
      notFound: true,
    };
  }
}

const PostDetail = ({ post, initialComments }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const router = useRouter();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("댓글 등록:", comment);

    const newComment = {
      id: Date.now().toString(),
      content: comment,
      createdAt: new Date(),
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  const handleEdit = () => {
    router.push({
      pathname: "/create-post",
      query: {
        id: post.id,
        createMode: "게시글 수정하기",
        title: post.title,
        content: post.content,
      },
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/articles/${post.id}`);

      router.push("/community");
    } catch (error) {
      console.error("게시글 삭제에 실패했습니다.", error);
    }
  };

  const isFormValid = comment !== "";

  const { title, content, createdAt } = post;
  // nickname, likes 디폴트값 사용
  const nickname = "총명한 판다";
  const likes = 123;

  return (
    <div className={styles.postDetail}>
      <div className={styles.titleContainer}>
        <span className="text-xl bold">{title}</span>
        <KebabDropdown onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <div className={styles.profileContainer}>
        <Image src={profileImage} alt="profile image" width={40} height={40} />
        <span className={`${styles.nickname} text-md medium`}>{nickname}</span>
        <span className={`${styles.date} text-md regular`}>
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </span>
        <div className={styles.likeBox}>
          <Image src={emptyHeart} alt="heart image" width={32} height={32} />
          <span className={`${styles.likes} text-lg medium`}>{likes}</span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span className={`${styles.content} text-2lg regular`}>{content}</span>
      </div>
      <form
        className={styles.commentInputContainer}
        onSubmit={handleCommentSubmit}
      >
        <label htmlFor="comment" className="text-lg semibold">
          댓글 달기
        </label>
        <textarea
          id="comment"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.textarea}
        />
        <button
          type="submit"
          className={`${styles.submitButton} ${
            isFormValid ? styles.active : ""
          } text-lg semibold`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </form>
      <div className={styles.commentsContainer}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
      <button
        className={`${styles.backButton} text-2lg semibold`}
        onClick={() => router.push("/community")}
      >
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostDetail;
