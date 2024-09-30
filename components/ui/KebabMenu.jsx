import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import styles from "./KebabMenu.module.scss";
import { useRouter } from "next/router";
import { useDeleteMutation } from "@/service/mutations";
import assets from "@/variables/images";
import { IconContainer } from "./ImgContainers";
import { DELETE, CREATE_UPDATE } from "@/variables/entities";
import { useConfirmModal } from "@/hooks/useModals";

export default function KebabMenu({ idPath, entity }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropDownRef = useRef(null);

  const { mutatePath } = CREATE_UPDATE(entity);

  const {
    path: pathAfterDeletion,
    deleteMessage,
    successMessage,
  } = DELETE(entity);

  const { onModalOpen, Modal } = useConfirmModal();

  const { mutate } = useDeleteMutation({ entity });

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleClickEdit = () => {
    router.push(`${mutatePath}/${idPath}`);
  };

  const handleClickDelete = () => {
    onModalOpen({ msg: deleteMessage, action: handleConfirmDelete });
  };

  const handleConfirmDelete = () => {
    mutate(idPath, {
      onSuccess: () => {
        onModalOpen({
          msg: successMessage,
          action: router.push(pathAfterDeletion),
        });
      },
    });
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
