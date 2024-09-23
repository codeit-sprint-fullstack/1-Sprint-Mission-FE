import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import { timeAgo } from "@/utils/timeAgo";
import { deleteComment } from "@/utils/productChatApi";
import { getUserProfile } from "@/utils/authApi";

export default function Chat({ comments, onEdit, setComments }) {
  const [isOpen, setIsOpen] = useState(null);
  const [authStatuses, setAuthStatuses] = useState({});

  useEffect(() => {
    const fetchAuthStatuses = async () => {
      const token = localStorage.getItem("accessToken"); // 토큰을 로컬 스토리지에서 가져옴
      if (!token) return; // 토큰이 없으면 인증하지 않음

      const statuses = await Promise.all(
        comments.map(async (comment) => {
          try {
            const userProfile = await getUserProfile(token);
            const isAuthenticated = userProfile.id === comment.writer.id; // 작성자와 현재 사용자를 비교
            return { id: comment.id, isAuthenticated };
          } catch (error) {
            console.error("Error fetching user profile", error);
            return { id: comment.id, isAuthenticated: false };
          }
        })
      );

      // 인증 상태를 객체로 변환해 상태 업데이트
      const statusObj = statuses.reduce((acc, { id, isAuthenticated }) => {
        acc[id] = isAuthenticated;
        return acc;
      }, {});
      setAuthStatuses(statusObj);
    };

    fetchAuthStatuses();
  }, [comments]);

  const toggleDropdown = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };

  const handleEdit = (comment) => {
    setIsOpen(null);
    onEdit(comment);
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
    setIsOpen(null);
  };

  return (
    <div className={styles.container}>
      {comments.map((comment) => {
        const isAuthenticated = authStatuses[comment.id]; // 현재 사용자와 댓글 작성자 비교

        return (
          <div key={comment.id} className={styles.item}>
            <div className={styles.contentContainer}>
              <p className={styles.content}>{comment.content}</p>
              {isAuthenticated && (
                <Image
                  src={kebab}
                  className={styles.kebab}
                  onClick={() => toggleDropdown(comment.id)}
                  alt="kebab"
                />
              )}
            </div>
            {isOpen === comment.id && (
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleEdit(comment)}
                >
                  수정하기
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제하기
                </div>
              </div>
            )}
            <div className={styles.profileContainer}>
              <Image
                src={profile}
                className={styles.profile}
                alt="profile image"
              />
              <div className={styles.profileInfo}>
                <p className={styles.name}>{comment.writer.nickname}</p>
                <p className={styles.date}>{timeAgo(comment.createdAt)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
