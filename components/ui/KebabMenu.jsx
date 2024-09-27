import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import styles from "./KebabMenu.module.scss";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { useDeleteMutation } from "@/service/mutations";
import assets from "@/variables/images";
import { IconContainer } from "./ImgContainers";

export default function KebabMenu({ idPath, entity, setIsEditMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropDownRef = useRef(null);

  let pathAfterDeletion = "";
  if (entity === "article") {
    pathAfterDeletion = "/forum";
  } else if (entity === "product") {
    pathAfterDeletion = "/products";
  }

  const { onModalOpen, modalRef, isModalOpen, onModalClose } =
    useModal(pathAfterDeletion);

  const { mutate } = useDeleteMutation(entity);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleClickEdit = () => {
    if (entity === "comment") {
      setIsEditMode(true);
    } else if (entity === "article") {
      router.push(`/forum/edit-article/${idPath}`);
    } else if (entity === "product") {
      router.push(`/products/edit-product/${idPath}`);
    }
  };

  const handleClickDelete = () => {
    onModalOpen();
  };

  const handleConfirmDelete = () => {
    mutate(idPath);
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
      {isModalOpen && (
        <Modal
          ref={modalRef}
          msg="게시글을 삭제 하시겠습니까?."
          onClose={handleConfirmDelete}
        />
      )}
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
