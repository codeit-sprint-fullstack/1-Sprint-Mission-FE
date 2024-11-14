import styles from "./CommentList.module.css";
import Image from "next/image";
import axios from "@/lib/axios";
import defaultUserImg from "@/images/defaultUserImg.png";
import NoComment from "./NoComment";
import CommentDropDown from "../BoardDetail/CommentDropDown";
import { Comment, CommentListProps } from "@/types/Types";

export default function CommentList({ commentList, setCommentList }: CommentListProps) {
  const handleDelete = async (commentId: number): Promise<void> => {
    try {
      await axios.delete(`/comments/${commentId}`);

      setCommentList((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("댓글 삭제 오류", error);
    }
  };

  return (
    <>
      <ul className={styles.commentListContainer}>
        {commentList.length > 0 ? (
          commentList.map((comment: Comment) => (
            <li key={comment.id}>
              <div className={styles.commentList}>
                <div className={styles.commentListHeader}>
                  <span className={styles.content}>{comment.content}</span>
                  <CommentDropDown onDelete={() => handleDelete(comment.id)} />
                </div>
                <div className={styles.commentInfoContainer}>
                  <Image src={defaultUserImg} alt="user" />
                  <div className={styles.commentInfo}>
                    <span className={styles.user}>똑똑한판다</span>
                    <span className={styles.date}>{comment.createdAt}</span>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <NoComment />
        )}
      </ul>
    </>
  );
}
