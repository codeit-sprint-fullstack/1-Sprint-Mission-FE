import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [nextAction, setNextAction] = useState(null);

  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const onModalOpen = ({ msg, action }) => {
    setIsModalOpen(true);
    setModalMsg(msg);

    if (action) {
      setNextAction(() => action);
    }
  };

  const onModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
      setNextAction(null);
    }
  };

  const onModalConfirm = (redirectPath = null) => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
    if (nextAction) {
      nextAction();
    }
    if (redirectPath) {
      router.push(redirectPath);
    }

    setNextAction(null);
  };

  return {
    modalRef,
    onModalOpen,
    onModalClose,
    onModalConfirm,
    isModalOpen,
    modalMsg,
    nextAction,
  };
}
