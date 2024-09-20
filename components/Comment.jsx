import { useRouter } from "next/router";
import { elapsedTime } from "@/utils/dateFormat";
import { useState } from "react";
import DropdownData from "./DropdownList/DropdownData";
import ConfirmModal from "./Modals/ConfirmModal";
import Image from "next/image";
import * as commentApi from "@/pages/api/comment";
import styles from "@/styles/comment.module.css";
import ic_kebab from "@/public/images/ic_kebab.png";
import ic_profile from "@/public/images/ic_profile.png";
import ic_heart from "@/public/images/ic_heart.png";

function Comment({ item, openAlert, setAlertMessage, user }) {
  const { content, writer, createAt, updateAt } = item;
  const router = useRouter();
  //날짜 포멧
  const createDate = elapsedTime(createAt);
  const updateDate = elapsedTime(updateAt);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [updateContent, setUpdateContent] = useState(false);
  const [value, setValue] = useState(content);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleUpdateComment = () => {
    setUpdateContent(true);
    setOpenDropdown(false);
  };
  const handleUpdateCancel = () => {
    setUpdateContent(false);
  };
  const handleDeleteComment = () => {
    setOpenDropdown(false);
    //삭제의 경우 confirm 모달을 통하여 확인하여 진행한다.
    setConfirmMessage("댓글이 영구적으로 삭제됩니다. 삭제하시겠습니까?");
    handleOpenConfirmModal();
  };

  const handleOpenDropdown = () => setOpenDropdown(!openDropdown);
  const handleOpenConfirmModal = () => setConfirmModal(true);
  const handleCloseConfirmModal = () => setConfirmModal(false);

  const updateComment = async () => {
    try {
      const res = await commentApi.updateComment(item.id, { content: value });
      if (res) {
        setUpdateContent(false);
        router.reload();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("댓글 수정에 실패했습니다." + error.name);
      openAlert();
    }
  };

  const deleteComment = async () => {
    try {
      const res = await commentApi.deleteComment(item.id);
      if (res) {
        setAlertMessage("댓글이 삭제 되었습니다.");
        handleCloseConfirmModal();
        openAlert();
        router.reload();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("댓글 삭제에 실패했습니다." + error.name);
      openAlert();
    }
  };

  return (
    <>
      <ConfirmModal
        onConfirm={deleteComment}
        onClose={handleCloseConfirmModal}
        isOpen={confirmModal}
        message={confirmMessage}
      />
      <div className={styles.comment_item_box}>
        <div className={styles.comment_item_content_box}>
          {updateContent ? (
            <textarea
              className={styles.comment_content_textarea}
              name="content"
              onChange={handleChangeValue}
              value={value || ""}
            />
          ) : (
            <p className={styles.comment_content}>{content}</p>
          )}
          {!updateContent && (
            <>
              {/* 작성자와 로그인 사용자가 같을때 수정/삭제 가능함 */}
              {user.id === writer.id && (
                <Image
                  onClick={handleOpenDropdown}
                  src={ic_kebab}
                  width={24}
                  height={24}
                  alt="수정/삭제이미지"
                />
              )}
            </>
          )}
          {openDropdown && (
            <DropdownData
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          )}
        </div>
        <div className={styles.comment_content_data_box}>
          <Image
            src={ic_profile}
            width={40}
            height={40}
            alt="사용자프로필이미지"
          />
          <div className={styles.comment_content_data}>
            <span className={styles.comment_name}>{writer.nickname}</span>
            <div>
              <span className={styles.comment_date}>{createDate}</span>
              {createAt !== updateAt && (
                <span className={styles.comment_update_date}>
                  ( 수정됨 {updateDate} )
                </span>
              )}
            </div>
          </div>

          {updateContent && (
            <div className={styles.comment_update_box}>
              <button
                onClick={handleUpdateCancel}
                className={styles.comment_data_cancel_btn}
              >
                취소
              </button>
              <button
                onClick={updateComment}
                className={styles.comment_data_save_btn}
              >
                수정 완료
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Comment;
