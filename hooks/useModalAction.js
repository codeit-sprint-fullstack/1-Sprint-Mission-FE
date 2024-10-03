import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export function useModalAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [nextAction, setNextAction] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const router = useRouter();

  const modalRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const onModalOpen = ({ msg, action, path }) => {
    setIsModalOpen(true);
    setModalMsg(msg);

    if (action) {
      setNextAction(() => action);
    }

    if (path) {
      setRedirect(() => router.push(path));
    }
  };

  const onModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
      setNextAction(null);
      setRedirect(null);
    }
  };

  const onModalConfirm = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
    if (nextAction) {
      nextAction();
    }

    if (redirect) {
      redirect();
    }

    setNextAction(null);
    setRedirect(null);
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
