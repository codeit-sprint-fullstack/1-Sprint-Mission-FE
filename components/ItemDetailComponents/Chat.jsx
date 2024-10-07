import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import { timeAgo } from "@/utils/timeAgo";
import { deleteComment } from "@/utils/productChatApi";
import { getUserProfile } from "@/utils/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import inquiry_empty from "@/images/img_inquiry_empty.png";

export default function Chat({ comments, onEdit, setComments }) {
  const [isOpen, setIsOpen] = useState(null);
  const [authStatuses, setAuthStatuses] = useState({});
  const queryClient = useQueryClient();

  // 유저 프로필 정보 가져오기
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!localStorage.getItem("accessToken"), // accessToken이 존재할 때만 쿼리 실행
    refetchOnWindowFocus: false,
  });

  // 댓글 삭제 mutation 설정
  const deleteCommentMutation = useMutation({
    mutationFn: (id) => deleteComment(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["comments"]);
      const previousComments = queryClient.getQueryData(["comments"]);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );

      return { previousComments };
    },
    onError: (error, id, context) => {
      console.error("Error deleting comment:", error);
      if (context?.previousComments) {
        setComments(context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  // 유저가 댓글의 작성자인지 여부를 설정
  useEffect(() => {
    if (userProfile && comments.length > 0) {
      const statuses = comments.reduce((acc, comment) => {
        acc[comment.id] = userProfile.id === comment.writer.id;
        return acc;
      }, {});
      setAuthStatuses(statuses);
    }
  }, [userProfile, comments]);

  // 드롭다운 토글 핸들러
  const toggleDropdown = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };

  // 수정 핸들러
  const handleEdit = (comment) => {
    setIsOpen(null);
    onEdit(comment);
  };

  // 삭제 핸들러
  const handleDelete = (id) => {
    deleteCommentMutation.mutate(id);
  };

  return (
    <div className={styles.container}>
      {comments.length === 0 ? (
        <div className={styles.emptyContainer}>
          <Image src={inquiry_empty} alt="empty" className={styles.emptyImg} />
          <p className={styles.emptyText}>아직 문의가 없어요</p>
        </div>
      ) : (
        comments.map((comment) => {
          const isAuthenticated = authStatuses[comment.id];

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
        })
      )}
    </div>
  );
}
