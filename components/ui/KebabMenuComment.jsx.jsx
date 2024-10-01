import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import styles from "./KebabMenu.module.scss";
import { useDeleteComment } from "@/service/mutations";
import assets from "@/variables/images";
import { IconContainer } from "./ImgContainers";
import { useConfirmModal } from "@/hooks/useModals";
import { CRUD_COMMENT } from "@/variables/entities";

export default function KebabMenuComment({
  idPath,
  whichComment,
  commentId,
  setIsEditMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const { onModalOpen, Modal } = useConfirmModal();

  const { mutate } = useDeleteComment({ idPath, whichComment });

  const { deleteMessage, successMessage } = CRUD_COMMENT(whichComment);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickEdit = () => {
    setIsOpen(false);
    setIsEditMode(true);
  };

  const handleClickDelete = () => {
    setIsOpen(false);
    onModalOpen({ msg: deleteMessage, action: handleConfirmDelete });
  };

  const handleConfirmDelete = () => {
    mutate(commentId, {
      onSuccess: () => {
        onModalOpen({ msg: successMessage });
      },
    });
  };

  //드롭다운 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Modal />
      <div className={styles.KebabMenu} ref={dropDownRef}>
        <Button onClick={toggleDropDown} variant="icon">
          <IconContainer src={assets.icons.kebab} alt="kebab menu icon" />
        </Button>
        {isOpen && (
          <ul>
            <li onClick={handleClickEdit}>수정하기</li>
            <li onClick={handleClickDelete}>삭제하기</li>
          </ul>
        )}
      </div>
    </>
  );
}
