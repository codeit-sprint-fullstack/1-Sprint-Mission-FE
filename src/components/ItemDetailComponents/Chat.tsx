import { useState, useMemo } from "react";
import styles from "./Chat.module.css";
import Image from "next/image";
import profile from "../../images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import { timeAgo } from "@/utils/timeAgo";
import { deleteComment } from "@/utils/productChatApi";
import { getUserProfile } from "@/utils/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import inquiry_empty from "../../images/img_inquiry_empty.png";
import { Comment } from "@/types/Types";
import { UserProfile } from "@/types/Types";

interface ChatProps {
  comments: Comment[];
  onEdit: (comment: Comment) => void;
}

export default function Chat({ comments, onEdit }: ChatProps) {
  console.log(comments);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!localStorage.getItem("accessToken"),
    refetchOnWindowFocus: false,
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = queryClient.getQueryData<{
        pages: { list: Comment[] }[];
      }>(["comments"]);

      if (!previousComments) {
        return { previousComments: undefined };
      }

      queryClient.setQueryData(["comments"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            list: page.list.filter((comment: Comment) => comment.id !== id),
          })),
        };
      });

      return { previousComments };
    },
    onError: (error, id, context: any) => {
      console.error("Error deleting comment:", error);
      if (context?.previousComments) {
        queryClient.setQueryData(["comments"], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const authStatuses = useMemo(() => {
    if (userProfile) {
      return comments.reduce<Record<number, boolean>>((acc, comment) => {
        acc[comment.id] = userProfile.id === comment.writer?.id;
        return acc;
      }, {});
    }
    return {};
  }, [userProfile, comments]);

  const toggleDropdown = (id: number) => {
    setIsOpen(isOpen === id ? null : id);
  };

  const handleEdit = (comment: Comment) => {
    setIsOpen(null);
    onEdit(comment);
  };

  const handleDelete = (id: number) => {
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
                  <p className={styles.name}>{comment.writer?.nickname}</p>
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
