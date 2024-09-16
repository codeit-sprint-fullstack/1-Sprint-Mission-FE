import { useRef, useState } from "react";
import { useRouter } from "next/router";

export function useModal(redirectPath) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();

  const onModalOpen = () => {
    if (modalRef.current) {
      setIsModalOpen(true);
      modalRef.current.showModal();
    }
  };

  const onModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setIsModalOpen(false);
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return { modalRef, onModalOpen, onModalClose, isModalOpen };
}
