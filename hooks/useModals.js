import { useModalAction } from "./useModalAction";
import Modal from "@/components/ui/modals/Modal";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";

export function useGlobalModal() {
  const { modalRef, onModalOpen, onModalClose, isModalOpen, modalMsg } =
    useModalAction();

  const GlobalModal = () => {
    return (
      isModalOpen && (
        <Modal ref={modalRef} msg={modalMsg} onClose={onModalClose} />
      )
    );
  };

  return {
    onModalOpen,
    GlobalModal,
    onModalClose,
  };
}

export function useConfirmModal() {
  const {
    modalRef,
    onModalOpen,
    onModalClose,
    isModalOpen,
    modalMsg,
    onModalConfirm,
  } = useModalAction();

  const Modal = () => {
    return (
      isModalOpen && (
        <ConfirmModal
          ref={modalRef}
          msg={modalMsg}
          onClose={onModalClose}
          onConfirm={onModalConfirm}
        />
      )
    );
  };

  return {
    onModalOpen,
    Modal,
  };
}
