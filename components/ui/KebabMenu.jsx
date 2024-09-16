import Image from "next/image";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import styles from "./KebabMenu.module.scss";
import kebabIcon from "../../public/assets/icons/ic_kebab.svg";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/hooks/useModal";
import { articleKey, commentKey } from "@/variables/queryKeys";

export default function KebabMenu({ idPath, deleteApi, entity }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropDownRef = useRef(0);
  const queryClient = useQueryClient();
  const { onModalOpen, modalRef, onModalClose, isModalOpen } =
    useModal(`/forum`);

  const deleteMutation = useMutation({
    mutationFn: (idPath) => deleteApi(idPath),
    onSuccess: () => {
      let queryKey;
      if (entity === "article") {
        queryKey = articleKey.all;
      } else if (entity === "comment") {
        queryKey = commentKey.all;
      }

      queryClient.invalidateQueries(queryKey);

      onModalOpen();
    },
  });

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleClickEdit = () => {
    router.push(`/forum/edit-article/${idPath}`);
  };

  const handleClickDelete = () => {
    deleteMutation.mutate(idPath);
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
      <div className={styles.KebabMenu} ref={dropDownRef}>
        <Button onClick={toggleDropDown} variant="icon">
          <Image src={kebabIcon} width={24} height={24} alt="kebab menu icon" />
        </Button>
        {isOpen && (
          <ul>
            <li onClick={handleClickEdit}>수정하기</li>
            <li onClick={handleClickDelete}>삭제하기</li>
          </ul>
        )}
      </div>
      {isModalOpen && (
        <Modal
          ref={modalRef}
          msg="게시글이 삭제되었습니다."
          onClose={onModalClose}
        />
      )}
    </>
  );
}
