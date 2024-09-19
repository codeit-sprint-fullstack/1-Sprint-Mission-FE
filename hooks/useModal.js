import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export function useModal(redirectPath) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return { modalRef, onModalOpen, onModalClose, isModalOpen, setIsModalOpen };
}
