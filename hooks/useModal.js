import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const onModalOpen = (msg) => {
    setIsModalOpen(true);
    setModalMsg(msg);
  };

  const onModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
  };

  const onModalConfirm = (redirectPath) => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return {
    modalRef,
    onModalOpen,
    onModalClose,
    onModalConfirm,
    isModalOpen,
    setIsModalOpen,
    modalMsg,
  };
}
