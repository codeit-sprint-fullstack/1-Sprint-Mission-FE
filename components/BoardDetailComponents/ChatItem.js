import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import reply_empty from "@/images/img_reply_empty.png";
import styles from "./ChatItem.module.css";
import { useState } from "react";
import { deleteComments } from "@/utils/articleChatApi";
import { timeAgo } from "@/utils/timeAgo";
import { useMutation } from "@tanstack/react-query";

export default function ChatItem({ comments, onEdit }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const mutation = useMutation({
    mutationFn: (id) => deleteComments(id),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleEdit = (chatItem) => {
    onEdit(chatItem);
    setOpenDropdownId(null);
  };

  return (
    <div className={styles.chatContainer}>
      {!comments.length ? (
        <div className={styles.nonContainer}>
          <Image
            src={reply_empty}
            alt="reply_empty"
            className={styles.replyImg}
            priority={true}
          />
          <div className={styles.nonText}>
            <p>아직 댓글이 없어요, </p>
            <p>지금 댓글을 달아보세요!</p>
          </div>
        </div>
      ) : (
        comments.map((chatItem) => (
          <div key={chatItem.id} className={styles.container}>
            <div className={styles.menu}>
              <p className={styles.content}>{chatItem.content}</p>
              <Image
                src={kebab}
                alt="kebab"
                className={styles.kebab}
                onClick={() => toggleDropdown(chatItem.id)}
              />
            </div>
            {openDropdownId === chatItem.id && (
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleEdit(chatItem)}
                >
                  수정하기
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleDelete(chatItem.id)}
                >
                  삭제하기
                </div>
              </div>
            )}
            <div className={styles.info}>
              <Image
                src={profile}
                alt="profile"
                className={styles.profileImg}
              />
              <div className={styles.infoText}>
                <p className={styles.user}>총명한 판다{chatItem.id}</p>
                <p className={styles.date}>{timeAgo(chatItem.createdAt)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
