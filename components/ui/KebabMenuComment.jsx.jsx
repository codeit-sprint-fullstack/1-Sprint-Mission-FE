import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import styles from "./KebabMenu.module.scss";
import { useDeleteComment } from "@/service/mutations";
import assets from "@/variables/images";
import { IconContainer } from "./ImgContainers";
import useGlobalModal from "@/hooks/useGlobalModal";

export default function KebabMenuComment({
  idPath,
  whichComment,
  commentId,
  setIsEditMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  console.log("commendId", commentId);
  console.log("idPath", idPath);
  console.log("whichComment", whichComment);
  const { onModalOpen, GlobalModal } = useGlobalModal();

  const { mutateAsync } = useDeleteComment({ idPath, whichComment });

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleClickEdit = () => {
    setIsEditMode(true);
  };

  const handleClickDelete = () => {
    onModalOpen({
      msg: "댓글을 삭제하시겠습니까?",
      action: handleConfirmDelete,
    });
  };

  const handleConfirmDelete = async () => {
    await mutateAsync(commentId);
  };

  //드롭다운 메뉴 외부 클릭 감지
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <GlobalModal />

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
